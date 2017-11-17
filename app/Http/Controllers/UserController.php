<?php
/**
* UserController to manage CRUD operation of users(super-admin, admin, agents).
* @param Request $request
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth,Mail,Hash;
use Response;
use App\Model\UserToken; /* User Token Model */
use App\Model\Users;

class UserController extends Controller
{

  /**
   * Login of User
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function userLogin(Request $request)
  {
    $email    = $request->email; //email id for login
    $password = $request->password; //password for login

    // Validation of login form
    $validator = \Validator::make($request->all(), [
          'email'    => 'required',
          'password' => 'required|min:6'
          ]);

    if($validator->fails()) {

        return Response::json(array(
            'status'   => false,
            'error'    => true,
            'code'     => 400,
            'response' => $validator->messages(),
            'message'  => null
        ));

    }

    // Merge email and userName for login
    $field                  = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
    $request->merge([$field => $request->input('email')]);
    $credentials            = $request->only($field, 'password');
    $credentials            = array_add($credentials, 'profile_status', '1'); //If profile status !1 then user is not Active

    if(Auth::attempt($credentials)) { //Attempt Auth login

        $token = $this->generateRandomString();
        $createToken = UserToken::where('user_id',Auth::user()->id)->with('userInfo')->first();

        if(count($createToken) ==0 ) {

            //create a new token
            $createToken                  = new UserToken;
            $createToken->user_id         = Auth::user()->id;
            $createToken->token           = $token;
            $createToken->profile_user_id = Auth::user()->id;
            $createToken->status          = 1;
            $createToken->save();

        } else {

            //update the old token
            $createToken->user_id         = Auth::user()->id;
            $createToken->token           = $token;
            $createToken->profile_user_id = Auth::user()->id;
            $createToken->status          = 1;
            $createToken->update();

        }
        $response = ['userId'=>Auth::user()->id,'userToken'=>$createToken->token,'userType'=>Auth::user()->type,'firstName'=>$createToken->userInfo->first_name,'lastName'=>$createToken->userInfo->last_name,'email'=>$createToken->userInfo->email];

        return Response::json(array(
            'status'   => true,
            'code'     => 200,
            'error'    => false,
            'response' => $response,
            'message'  => "Logged in Successfully."
        ));

    } else {

        return Response::json(array(
            'status'  => false,
            'code'    => 400,
            'error'   => true,
            'response'=> null,
            'message' => 'Invalid username or password!'
        ));

    }
  }

  /**
   * Get User Profile
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function getUserProfile(Request $request)
  {
    if($request->token != "") {

        $token       = $request->token; //User token
        $getUserInfo = UserToken::where('token',$token)->with('userInfo')->first();

        if(count($getUserInfo)!=0) {

            return Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $getUserInfo,
                'message'  => "User Info Successfully Retrived !"
            ));

        } else {

            return Response::json(array(
                'status'  => false,
                'code'    => 400,
                'error'   => true,
                'response'=> null,
                'message' => 'No User Found !'
            ));

        }
    }else{

        return Response::json(array(
            'status'  => false,
            'code'    => 400,
            'error'   => true,
            'response'=> null,
            'message' => 'Invalid token !'
        ));

    }
  }

  /**
   * Generate random String
   * @return String
   */
  function generateRandomString()
  {
    $length           = 16;
    $characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString     = '';

    for ($i = 0; $i < $length; $i++) {

        $randomString .= $characters[rand(0, $charactersLength - 1)];

    }

    return $randomString;
  }

  /**
   * Check forget password email
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function checkForgetPasswordEmail(Request $request)
  {
    $email = trim($request->email);

    if($email != ""){

        $checkUserInfo = Users::where('email',$email)->first();

        if( count($checkUserInfo) != 0 ){

            $emailJsonResponse =  $this->sendForgotPasswordLinkMail($email);
            $emailResponse     = json_decode($emailJsonResponse->content(), true);

            if( $emailResponse['code'] == 200 ) {

                return Response()->json([
                    'code'    => 200,
                    'status'  => true,
                    'error'   => false,
                    'response'=> null,
                    'message' => 'Password Reset Mail Successfully Send To Your Registered Email!!'
                ]);

            }

            if( $emailResponse['code'] == 400 ) {

                return Response::json(array(
                    'code'    => 400,
                    'status'  => false,
                    'error'   => true,
                    'response'=> null,
                    'message' => 'Try Again !!!'
                ));

            }
        } else {

            return Response::json(array(
                'status'  => false,
                'code'    => 400,
                'error'   => true,
                'response'=> null,
                'message' => 'No User Found !'
            ));

        }
    }
  }

  /**
   * Send forget password link using mail to user
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function sendForgotPasswordLinkMail($email)
  {
    $email = trim($email);

    if($email != ""){

      $forget_check = Users::where('email',$email)->first();

      if(count($forget_check)!=0) {

            $accutal_id = base64_encode($forget_check->id);
            $body       = url('/').'/reset-password/'.$accutal_id;

            // Send Mail to user email id
            Mail::send([],[], function($message) use ($body,$forget_check){
                $message->from(getenv('MAIL_USERNAME'),"Password");
                $message->to($forget_check->email, $forget_check->first_name)->subject('Forget Password')->setBody($body,'text/html');
            });

            if (Mail::failures()) {

                return Response()->json([
                  'code'    => 400,
                  'error'   => true,
                  'status'  => false,
                  'response'=> null,
                  'message' => 'Try Again!!'
                ]);

            } else {

                return Response()->json([
                    'code'    => 200,
                    'error'   => false,
                    'status'  => true,
                    'response'=> null,
                    'message' => 'Password Reset Mail Successfully Send To Your Registered Email!!'
                ]);

            }
      } else {

        return Response::json(array(
            'status'  => false,
            'code'    => 400,
            'error'   => true,
            'response'=> null,
            'message' => 'No User Found !'
        ));

      }
    } else {

        return Response::json(array(
            'status'  => false,
            'code'    => 400,
            'error'   => true,
            'response'=> null,
            'message' => 'No User Found !'
        ));

    }
  }

  /**
   * Request forget password
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function getUserinfoWithForgetPasswordLink($id=null)
  {
      if($id!="") {

          $userId   = base64_decode($id);
          $findUser = Users::where('id',$userId)->first();

          if(count($findUser) != 0){

             return Response::json(array(
                 'status'   => true,
                 'code'     => 200,
                 'response' => $findUser,
                 'error'    => false,
                 'message'  => "User Info Successfully Retrived !"
             ));

          } else {

             return Response::json(array(
                 'status'  => false,
                 'code'    => 400,
                 'response'=> null,
                 'error'   => true,
                 'message' => 'No User Found !'
             ));

          }
      } else {

          return Response::json(array(
             'status'  => false,
             'code'    => 400,
             'response'=> null,
             'error'   => true,
             'message' => 'Invalid ID !'
          ));

      }
  }

  /**
   * Update Forget Password
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function updateForgetPassword(Request $request)
  {
    $pass      =$request->password; // Password
    $conf_pass =$request->conf_pass; // Confirm Password
    $id        =base64_decode($request->id); //User ID send from the form

    if($pass == $conf_pass){

        $user           = Users::where('id',$id)->first();
        $user->password = Hash::make($pass);
        // $user->update();

        if($user->update()) {

            return Response()->json([
              'code'    => 200,
              'success' => true,
              'error'   => false,
              'status'  => true,
              'response'=> null,
              'message' => 'Your Password Updated Successfully!'
            ]);

        } else {

            return Response()->json([
                'code'    =>400,
                'success' => false,
                'error'   => true,
                'status'  => false,
                'response'=> null,
                'message' => 'Try Again!'
            ]);

        }
    } else {

        return Response()->json([
            'code'    => 400,
            'error'   => true,
            'success' => false,
            'status'  => false,
            'response'=> null,
            'message' => 'Password And Confirm Password Is Not Same!'
        ]);

    }
  }

  /**
   * User Profile Update API Function
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function updateUserProfile(Request $request)
  {
    $userId       = $request->userId;
    $firstName    = $request->firstName;
    $lastName     = $request->lastName;
    $email        = trim($request->email);
    $userName     = trim($request->userName);
    $phone        = $request->phone;
    $company      = $request->company;

    if($userId !=""){

        $checkUser = Users::where('id',$userId)->first();

        if(count($checkUser) != 0){

            $checkUser->first_name = $firstName;
            $checkUser->last_name  = $lastName;

            // Check email is unique or not
            if ($email!="") {

                $checkUserWithEmail = Users::where('id','!=',$userId)->where('email',$email)->first();

                if (count($checkUserWithEmail) == 0) {

                    $checkUser->email = $email;

                } else {

                    return Response()->json([
                        'code'    => 400,
                        'error'   => true,
                        'status'  => false,
                        'response'=> null,
                        'message' => 'Email ID already exists !'
                    ]);

                }
            }

            // Check username is unique or not
            if ($userName!="") {

                $checkUserWithUserName = Users::where('id','!=',$userId)->where('username',$userName)->first();

                if (count($checkUserWithUserName) == 0) {

                    $checkUser->username = $userName;

                } else {

                    return Response()->json([
                        'code'    => 400,
                        'error'   => true,
                        'status'  => false,
                        'response'=> null,
                        'message' => 'UserName already exists !'
                    ]);

                }
            }

            $checkUser->phone = $phone;
            $checkUser->company = $company;

            if($checkUser->save()) {

                return Response()->json([
                   'code'    => 200,
                   'error'   => false,
                   'status'  => true,
                   'response'=> $checkUser,
                   'message' => 'User Updated !'
                ]);

            }
        }
    } else {

        return Response()->json([
           'code'    => 400,
           'error'   => true,
           'status'  => false,
           'response'=> null,
           'message' => 'Not a valid User ID !'
        ]);

    }
  }

  /**
   * Admin Registration
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function adminRegistration(Request $request)
  {
    $firstName = $request->firstName;
    $lastName  = $request->lastName;
    $email     = trim($request->email);
    $userName  = trim($request->userName);
    $phone     = $request->phone;
    $password  = $request->password;
    $company   = $request->company;

    //Assign the parentId adn User type of the Created User
    if(Auth::check()){

        if(Auth::user()->type == 1){

            $parentId = Auth::user()->id;
            $type     =2;

        }

        if(Auth::user()->type == 2){

            $parentId = Auth::user()->id;
            $type     =3;

        }

    } else {

        $parentId = 0;
        $type     = 2;

    }
    if($email!="" && $userName!= ""){

      $checkUserNameExist = Users::where('username', $userName)->first();  //Check username exist

      if (count($checkUserNameExist)==0) {

          $checkEmailExist = Users::where('email',$email)->orWhere('username', $userName)->first(); //Check email exist

          if(count($checkEmailExist)==0){

              $saveUser                 = new Users;
              $saveUser->first_name     = $firstName;
              $saveUser->last_name      = $lastName;
              $saveUser->email          = $email;
              $saveUser->username       = $userName;
              $saveUser->phone          = $phone;
              $saveUser->password       = Hash::make($password);
              $saveUser->type           = $type; //Depands on the User Creation type by default 2
              $saveUser->company        = $company;
              $saveUser->parent_id      = $parentId;
              $saveUser->profile_status = 1; //Profile set to Active

              if($saveUser->save()){

                  if($saveUser->type == 2 ){

                      $UserData                          = new Request;
                      $UserData->userId                  = $saveUser->id; //admin ID
                      $UserData->email                   = $saveUser->email; //admin Email ID Used as the Firendly Name in Twilio Account
                      //send to TwilioController for creating twilio subacount
                      $saveAdminTwilioCredential         =  app(\App\Http\Controllers\TwilioController::class)
                      ->createTwilioSubacount($UserData);   // Create Twilio sub-account
                      $saveAdminTwilioCredentialResponse = json_decode($saveAdminTwilioCredential->content(), true);

                      if($saveAdminTwilioCredentialResponse['code'] == 200){

                          \Log::info($saveAdminTwilioCredentialResponse['message']);

                      }

                      if($saveAdminTwilioCredentialResponse['code'] == 400){

                          \Log::info($saveAdminTwilioCredentialResponse['message']);

                      }
                  }

                  return Response()->json([
                     'code'    => 200,
                     'success' => true,
                     'error'   => false,
                     'status'  => true,
                     'response'=> $saveUser,
                     'message' => 'Admin User Saved !'
                  ]);

              } else {

                   return Response()->json([
                       'code'    => 400,
                       'success' => false,
                       'error'   => true,
                       'status'  => false,
                       'response'=> null,
                       'message' => 'Admin User not saved,please try again in a while !'
                   ]);

              }
          } else {

              return Response()->json([
                 'code'    => 400,
                 'error'   => true,
                 'success' => false,
                 'status'  => false,
                 'response'=> null,
                 'message' => 'Email ID exist,please choose new email id !'
              ]);

          }
      } else {

          return Response()->json([
             'code'    => 400,
             'error'   => true,
             'success' => false,
             'status'  => false,
             'response'=> null,
             'message' => 'Username exist,please choose new username !'
          ]);

      }
    } else {

      return Response()->json([
          'code'    => 400,
          'error'   => true,
          'success' => false,
          'status'  => false,
          'response'=> null,
          'message' => 'Please provide valid data !'
      ]);

    }
  }

  /**
   * Get List of Admin Users
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function adminList()
  {
    $adminList = Users::where('type',2)->select('id','parent_id','first_name','last_name','email','username','type','phone','company','created_at','updated_at')->get();

    if(count($adminList)!=0){

        return Response()->json([
            'code'     => 200,
            'success'  => true,
            'error'    => false,
            'status'   => true,
            'response' => $adminList,
            'message'  => 'List of Admins !'
        ]);

    } else {

        return Response()->json([
            'code'     => 400,
            'success'  => false,
            'error'    => true,
            'response' => [],
            'status'   => false,
            'message'  => 'No Admin Found !'
        ]);

    }
  }

  /**
   * Emulate admin an user
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function emulateUser(Request $request)
  {
    $userId            = $request->userId;
    $loggedinUserToken = $request->userToken;
    $logUser = Users::find($userId);

    if(count($logUser)!=0) {

        $findUser = UserToken::where('token',$loggedinUserToken)->first();

        if(count($findUser)!=0){

            $findUser->profile_user_id = $userId;
            $findUser->save();
            $loginUserToken            = $findUser->token;

            return Response()->json([
                'code'     => 200,
                'success'  => true,
                'error'    => false,
                'status'   => true,
                'response' =>['token'=>$loginUserToken,'userType'=>$logUser->type],
                'message'  => 'token for emulated user !'
            ]);

        } else {

            return Response()->json([
                'code'    => 400,
                'success' => false,
                'error'   => true,
                'status'  => false,
                'response'=> null,
                'message' => 'Sorry user not found !'
            ]);

        }
    } else {

        return Response()->json([
            'code'    => 400,
            'error'   => true,
            'success' => false,
            'status'  => false,
            'response'=> null,
            'message' => 'Sorry user not found !'
        ]);

    }
  }

  /**
   * Block an User
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function blockUser(Request $request)
  {
    $userId    = $request->userId;
    $checkUser = Users::where('id',$userId)->first(); //Check user is exist

    if(count($checkUser)!=0) {

        $checkUser->profile_status = 2 ; //status 2 for Block user

        if($checkUser->update()) {  // Update User

            $UserData                            = new Request;
            $UserData->userId                    = $userId; //User / admin ID
            $updateAdminTwilioCredential         =  app(\App\Http\Controllers\TwilioController::class)
            ->suspandUserTwilioAccount($UserData);  // Twilio sub-account deactivate
            $updateAdminTwilioCredentialResponse = json_decode($updateAdminTwilioCredential->content(), true);

            if($updateAdminTwilioCredentialResponse['code'] == 200){

              \Log::info($updateAdminTwilioCredentialResponse['message']);  // Twilio response Log

            }

            if($updateAdminTwilioCredentialResponse['code'] == 400){

              \Log::info($updateAdminTwilioCredentialResponse['message']);  // Twilio response Log

            }

            return Response()->json([
                'code'    => 200,
                'success' => true,
                'error'   => false,
                'status'  => true,
                'response'=> null,
                'message' => 'User Blocked !'
            ]);

        } else {

            return Response()->json([
                'code'    => 400,
                'success' => false,
                'error'   => true,
                'status'  => false,
                'response'=> null,
                'message' => 'User Not Blocked try again later !'
            ]);

        }
    } else {

        return Response()->json([
            'code'    => 400,
            'success' => false,
            'error'   => true,
            'status'  => false,
            'response'=> null,
            'message' => 'User not found !'
        ]);

    }
  }

  /**
   * Unblock of an user
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function unblockUser(Request $request)
  {
    $userId    = $request->userId;
    $checkUser = Users::where('id',$userId)->first(); //Check user is exist

    if(count($checkUser)!=0) {

        $checkUser->profile_status = 1 ; //status 1 for Reactive Block user

        if($checkUser->update()){ //Update User

            $UserData                            = new Request;
            $UserData->userId                    = $userId; //User / admin ID
            $updateAdminTwilioCredential         =  app(\App\Http\Controllers\TwilioController::class)
            ->reactiveUserTwilioAccount($UserData); // Reactivate twilio sub account
            $updateAdminTwilioCredentialResponse = json_decode($updateAdminTwilioCredential->content(), true);

            if($updateAdminTwilioCredentialResponse['code'] == 200) {

                \Log::info($updateAdminTwilioCredentialResponse['message']); // Log Twilio response

            }

            if($updateAdminTwilioCredentialResponse['code'] == 400) {

                \Log::info($updateAdminTwilioCredentialResponse['message']); // Log Twilio response

            }

            return Response()->json([
                'code'    => 200,
                'success' => true,
                'status'  => true,
                'response'=> null,
                'message' => 'User Unblocked !'
            ]);

        } else {

            return Response()->json([
                'code'    => 400,
                'success' => false,
                'status'  => false,
                'response'=> null,
                'message' => 'User Not Unblock try again later !'
            ]);

        }
    } else {

          return Response()->json([
              'code'    => 400,
              'error'   => true,
              'status'  => false,
              'response'=> null,
              'message' => 'User not found !'
          ]);

    }
  }

  /**
   * Logout of users
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function logOut(Request $request)
  {
    $token = $request->token; //Get the token

    if($token != ""){


        $checkToken = UserToken::where('token',$token)->first(); // checking the token valid or not

        if(count($checkToken)!=0){

            if($checkToken->delete()){  //Delete the token

                return Response()->json([
                    'code'    => 200,
                    'success' => true,
                    'status'  => true,
                    'response'=> null,
                    'message' => 'User Logged Out !'
                ]);

            }else{

                return Response()->json([
                    'code'    => 400,
                    'success' => false,
                    'status'  => false,
                    'response'=> null,
                    'message' => 'User Not Logged Out !'
                ]);

            }
        } else {

            return Response()->json([
                'code'    => 400,
                'success' => false,
                'status'  => false,
                'response'=> null,
                'message' => 'User Not Found !'
            ]);

        }
    } else {

        return Response()->json([
            'code'    => 400,
            'success' => false,
            'status'  => false,
            'response'=> null,
            'message' => 'Token Not Found !'
        ]);

    }
  }

  /**
   * Create Agent
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function agentRegister(Request $request)
  {
    $firstName  = $request->firstName;
    $lastName   = $request->lastName;
    $email      = trim($request->email);
    $userName   = trim($request->userName);
    $phone      = $request->phone;
    $password   = $request->password;
    $parentId   = $request->parentId;
    $department = $request->department;
    $type       = 3;

    if($email!="" && $userName!= ""){

      $checkUserNameExist = Users::where('username', $userName)->first();  // Check username is unique

      if (count($checkUserNameExist)==0) {

          $checkEmailExist = Users::where('email',$email)->orWhere('username', $userName)->first(); // Check email is unique

          if(count($checkEmailExist)==0){

              $saveUser                 = new Users;
              $saveUser->first_name     = $firstName;
              $saveUser->last_name      = $lastName;
              $saveUser->email          = $email;
              $saveUser->username       = $userName;
              $saveUser->phone          = $phone;
              $saveUser->password       = Hash::make($password);
              $saveUser->type           = $type; // Depands on the User Creation type by default 2
              $saveUser->parent_id      = $parentId;
              $saveUser->profile_status = 1; // Profile set to Active

              if($saveUser->save()){

                  return Response()->json([
                      'code'    => 200,
                      'success' => true,
                      'error'   => false,
                      'status'  => true,
                      'response'=> $saveUser,
                      'message' => 'Agent User Saved !'
                  ]);

              } else {

                  return Response()->json([
                     'code'    => 400,
                     'error'   => true,
                     'success' => false,
                     'status'  => false,
                     'response'=> null,
                     'message' => 'Agent User not saved,please try again in a while !'
                 ]);

              }
          } else {

              return Response()->json([
                 'code'    => 400,
                 'error'   => true,
                 'success' => false,
                 'status'  => false,
                 'response'=> null,
                 'message' => 'Email ID exist,please choose new email id !'
              ]);

          }
      } else {

          return Response()->json([
             'code'=> 400,
             'error' => true,
             'success' => false,
             'status' => false,
             'response'=> null,
             'message' => 'Username exist,please choose new username !'
          ]);

      }
    } else {

        return Response()->json([
           'code'    => 400,
           'error'   => true,
           'success' => false,
           'status'  => false,
           'response'=> null,
           'message' => 'Please provide valid data !'
        ]);

    }
  }

  /**
   * Get List of Agents
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function listofAgent(Request $request)
  {
    $adminId = $request->parent_id;

    if ($adminId!='') { //Get agent list of an admin

        $getAgents = Users::where('parent_id',$adminId)->get();

    } else {  // Get all agents

        $getAgents = Users::where('type',3)->get();

    }
    if (count($getAgents)!=0) {

        $response = array('code'=>200,'error'=>true,'response'=>$getAgents,'status'=>true,'message'=>'List of Agents !');

    } else{

        $response = array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'No Agent Found !');

    }

    return Response()->json($response);
  }

  /**
   * Update Agent Profile
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function updateAgent(Request $request)
  {
    $userId     = $request->id;
    $firstName  = $request->firstName;
    $lastName   = $request->lastName;
    $email      = trim($request->email);
    $userName   = trim($request->userName);
    $phone      = $request->phone;
    $password   = $request->password;
    $parentId   = $request->parentId;
    $department = $request->department;

    if ($userId!='') {

      $checkUser = Users::where('id',$userId)->first(); // Check user is in record

      if (count($checkUser) != 0) {

          if ($userName!="") {

              $checkUserWithUserName = Users::where('id','!=',$userId)->where('username',$userName)->first(); // Check username is unique

              if (count($checkUserWithUserName) == 0) {

                  $checkUser->username   = $userName;
                  $checkUser->first_name = $firstName;
                  $checkUser->last_name  = $lastName;
                  $checkUser->phone      = $phone;
                  $checkUser->password   = Hash::make($password);
                  $checkUser->parent_id  = $parentId;

                if ($checkUser->save()){ // Save user data

                    $response = array('code'=>200,'error'=>false,'response'=>$checkUser,'status'=>false,'message'=>'Agent Updated!');

                } else {

                    $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Agent not updated !');

                }
              } else {

                  $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Username exist. Please give another !');

              }
          } else {

              $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Please give an unique username !');

          }
      } else {

          $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Agent ID not Found !');

      }
    } else {

        $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Agent ID not Found !');

    }

    return Response()->json($response);
  }

  /**
   * Agent Status Update (Active/Inactive)
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function agentStatusUpdate(Request $request)
  {
    $userId = $request->id;

    if ($userId!='') {

        $checkUser = Users::where('id',$userId)->first(); //Check User is in record

        if (count($checkUser) != 0) {

            if ($checkUser->profile_status == 2) { //Check status is Inactive

                $checkUser->profile_status = 1;
                $response                  = array('code'=>200,'response'=>null,'error'=>false,'status'=>false,'message'=>'Agent Activated !');

            } else {

                $checkUser->profile_status = 2;
                $response                  = array('code'=>200,'response'=>null,'error'=>false,'status'=>false,'message'=>'Agent DeActivated !');

            }

            if (!$checkUser->save()) { // User status Update

                $response = array('code'=>400,'response'=>null,'error'=>true,'status'=>false,'message'=>'Agent Update Failed !');

            }

        } else {

            $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'No Agent Found !');

        }

    } else {

        $response = array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'No Agent Found !');

    }

    return Response()->json($response);
  }
}