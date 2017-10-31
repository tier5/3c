<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth,Mail,Hash;
use Response;
use App\Model\UserToken; /* User Token Model */
use App\Model\Users;

class UserController extends Controller
{
    public function userLogin(Request $request){
      $email = $request->email; //email id for login
      $password = $request->password; //password for login

      $validator = \Validator::make($request->all(), [
            'email' => 'required|Email|exists:users,email',
            'password' => 'required|min:6'
        ]);

        if($validator->fails()){
            return  Response::json(array(
                        'status' => false,
                        'code' => 400,
                        'response' => $validator->messages()
                    ));
        }
        $credentials = $request->only('email', 'password');
        $credentials = array_add($credentials, 'profile_status', '1'); //If profile status !1 then user is not Active

        if(Auth::attempt($credentials)) {
            $token = $this->generateRandomString();
            $createToken = UserToken::where('user_id',Auth::user()->id)->first();
            if(count($createToken) ==0 ){
              //create a new token
              $createToken = new UserToken;
              $createToken->user_id = Auth::user()->id;
              $createToken->token = $token;
              $createToken->profile_user_id = Auth::user()->id;
              $createToken->status = 1;
              $createToken->save();
            }else{
              //update the old token
              $createToken->user_id = Auth::user()->id;
              $createToken->token = $token;
              $createToken->profile_user_id = Auth::user()->id;
              $createToken->status = 1;
              $createToken->update();
            }

            $response = ['userId'=>Auth::user()->id,'userToken'=>$createToken->token];

            return  Response::json(array(
                        'status' => true,
                        'code' => 200,
                        'response' => $response,
                        'message' => "Logged in Successfully."
                  ));
        }else{
            return  Response::json(array(
                      'status' => false,
                      'status_code' => 500,
                      'message' => 'Invalid username or password!'
              ));
           }
     }

    public function getUserProfile(Request $request){
      if($request->token != ""){
        $token = $request->token; //User token
        $getUserInfo = UserToken::where('token',$token)->with('userInfo')->get();
        if(count($getUserInfo)!=0){
          return  Response::json(array(
                      'status' => true,
                      'code' => 200,
                      'response' => $getUserInfo,
                      'message' => "User Info Successfully Retrived !"
                ));
        }else{
          return  Response::json(array(
                    'status' => false,
                    'code' => 500,
                    'message' => 'No User Found !'
            ));
        }
      }else{
        return  Response::json(array(
                  'status' => false,
                  'code' => 500,
                  'message' => 'Invalid token !'
          ));
      }
    }

    function generateRandomString(){
        $length = 16;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function checkForgetPasswordEmail(Request $request){
      $email = trim($request->email);
      if($email != ""){
        $checkUserInfo = Users::where('email',$email)->first();
        if( count($checkUserInfo) != 0 ){
          $emailJsonResponse =  $this->sendForgotPasswordLinkMail($email);
          $emailResponse = json_decode($emailJsonResponse->content(), true);
          if( $emailResponse['code'] == 200 ){
              return Response()->json([
                  'code'=>200,
                  'status' => true,
                  'error' => false,
                  'message' => 'Password Reset Mail Successfully Send To Your Registered Email!!'
              ]);
          }if( $emailResponse['code'] == 500 ){
            return  Response::json(array(
                      'code'=> 500,
                      'status' => false,
                      'error' => true,
                      'message' => 'Try Again !!!'
              ));
           }
        }else{
          return  Response::json(array(
                    'status' => false,
                    'code' => 500,
                    'message' => 'No User Found !'
            ));
        }
      }
    }

    public function sendForgotPasswordLinkMail($email){
      $email = trim($email);
      if($email != ""){
        $forget_check = Users::where('email',$email)->first();
        if(count($forget_check)!=0){
                $accutal_id = base64_encode($forget_check->id);
                $body=url('/').'/reset-password/'.$accutal_id;
                Mail::send([],[], function($message) use ($body,$forget_check){
                    $message->from(getenv('MAIL_USERNAME'),"Password");
                    $message->to($forget_check->email, $forget_check->first_name)->subject('Forget Password')->setBody($body,'text/html');
                });
                if (Mail::failures()) {
                    return Response()->json([
                        'code'=>500,
                        'error' => true,
                        'status' => false,
                        'message' => 'Try Again!!'
                    ]);
                }else{
                    return Response()->json([
                        'code'=>200,
                        'error' => false,
                        'status' => true,
                        'message' => 'Password Reset Mail Successfully Send To Your Registered Email!!'
                    ]);
                }
          }else{
            return  Response::json(array(
                      'status' => false,
                      'code' => 500,
                      'message' => 'No User Found !'
              ));
            }
        }else{
            return  Response::json(array(
                      'status' => false,
                      'code' => 500,
                      'message' => 'No User Found !'
              ));
          }
     }

     public function getUserinfoWithForgetPasswordLink($id=null){
       if($id!=""){
         $userId = base64_decode($id);
         $findUser = Users::where('id',$userId)->first();
         if(count($findUser) != 0){
           return  Response::json(array(
                       'status' => true,
                       'code' => 200,
                       'response' => $findUser,
                       'message' => "User Info Successfully Retrived !"
                 ));
         }else{
           return  Response::json(array(
                     'status' => false,
                     'code' => 500,
                     'message' => 'No User Found !'
             ));
          }
       }else{
          return  Response::json(array(
                   'status' => false,
                   'code' => 500,
                   'message' => 'Invalid ID !'
            ));
         }
     }

     public function updateForgetPassword(Request $request){
        $pass=$request->password; // Password
        $conf_pass=$request->conf_pass; // Confirm Password
        $id=base64_decode($request->id); //User ID send from the form
        if($pass == $conf_pass){
                $user = Users::where('id',$id)->first();
                $user->password = Hash::make($pass);
                $user->update();
                if($user->update()){
                    return Response()->json([
                        'code'=>200,
                        'success' => true,
                        'status' => true,
                        'message' => 'Your Password Updated Successfully!'
                    ]);
                }else{
                    return Response()->json([
                        'code'=>400,
                        'error' => true,
                        'status' => false,
                        'message' => 'Try Again!'
                    ]);
                }
        }else{
            return Response()->json([
                'code'=>400,
                'error' => true,
                'status' => false,
                'message' => 'Password And Confirm Password Is Not Same!'
            ]);
        }
     }
     //User Profile Update API Function
     public function updateUserProfile(Request $request){
       $userId = $request->userId;
       $firstName = $request->firstName;
       $lastName = $request->lastName;
       $email = trim($request->email);
       $userName = $request->userName;
       $phone = $request->phone;
       $password = $request->password;
       $confPassword = $request->confPassword;
       if($userId !=""){
         $checkUser = Users::where('id',$userId)->first();
         if(count($checkUser) != 0){
           $checkUser->first_name = $firstName;
           $checkUser->last_name = $lastName;
           if($email != ""){
             $checkUserWithEmail = Users::where('id',$userId)->where('email',$email)->first();
             if(count($checkUserWithEmail) !=0 ){
               $checkUser->email = $email;
             }else{
              $checkUserWithEmail = Users::where('email',$email)->first();
              if(count($checkUserWithEmail) != 0){
                $checkUser->email = $email;
              }else{
                return Response()->json([
                    'code'=>400,
                    'error' => true,
                    'status' => true,
                    'message' => 'email already exists !'
                ]);
              }
             }
           }
           $checkUser->username = $userName;
           $checkUser->phone = $phone;

           if($password != ""){
             if($password == $confPassword){
               $checkUser->password = Hash::make($password);
             }
           }
         if($checkUser->save()){
           return Response()->json([
               'code'=>200,
               'error' => false,
               'status' => false,
               'message' => 'User Updated !'
           ]);
         }
         }
       }else{
         return Response()->json([
             'code'=>400,
             'error' => true,
             'status' => false,
             'message' => 'Not a valid User ID !'
         ]);
       }
     }

     public function adminRegistration(Request $request){
       $firstName = $request->firstName;
       $lastName = $request->lastName;
       $email = trim($request->email);
       $userName = $request->userName;
       $phone = $request->phone;
       $password = $request->password;
       $company = $request->company;
       //Assign the parentId adn User type of the Created User
       if(Auth::check()){
         if(Auth::user()->type == 1){
           $parentId = Auth::user()->id;
           $type =2;
         }if(Auth::user()->type == 2){
           $parentId = Auth::user()->id;
           $type =3;
         }
       }else{
         $parentId = 0;
         $type = 2;
       }

       if($email!=""){
         $checkEmailExist = Users::where('email',$email)->first();
         if(count($checkEmailExist)==0){
           $saveUser = new Users;
           $saveUser->first_name = $firstName;
           $saveUser->last_name = $lastName;
           $saveUser->email = $email;
           $saveUser->username = $userName;
           $saveUser->phone = $phone;
           $saveUser->password = Hash::make($password);
           $saveUser->type = $type; //Depands on the User Creation type by default 2
           $saveUser->company = $company;
           $saveUser->parent_id = $parentId;
           $saveUser->profile_status = 1; //Profile set to Active
           if($saveUser->save()){
             if($saveUser->type == 2 ){
               $UserData = new Request;
               $UserData->userId = $saveUser->id; //admin ID
               $UserData->email = $saveUser->email; //admin Email ID Used as the Firendly Name in Twilio Account
               //send to TwilioController for creating twilio subacount
               $saveAdminTwilioCredential =  app(\App\Http\Controllers\TwilioController::class)
                ->createTwilioSubacount($UserData);
               $saveAdminTwilioCredentialResponse = json_decode($saveAdminTwilioCredential->content(), true);
               if($saveAdminTwilioCredentialResponse['code'] == 200){
                \Log::info($saveAdminTwilioCredentialResponse['message']);
              }if($saveAdminTwilioCredentialResponse['code'] == 500){
                \Log::info($saveAdminTwilioCredentialResponse['message']);
              }
             }
             return Response()->json([
                 'code'=>200,
                 'success' => true,
                 'status' => true,
                 'message' => 'Admin User Saved !'
             ]);
           }else{
             return Response()->json([
                 'code'=>400,
                 'error' => true,
                 'status' => false,
                 'message' => 'Admin User not saved,please try again in a while !'
             ]);
           }
         }else{
           return Response()->json([
               'code'=>400,
               'error' => true,
               'status' => false,
               'message' => 'Email ID exist,please choose new email id !'
           ]);
         }
       }else{
         return Response()->json([
             'code'=>400,
             'error' => true,
             'status' => false,
             'message' => 'Please provide valid data !'
         ]);
       }

     }

     public function adminList(){
       $adminList = Users::where('type',2)->select('id','parent_id','first_name','last_name','email','username','type','phone','company','created_at','updated_at')->get();
       if(count($adminList)!=0){
         return Response()->json([
             'code'=> 200,
             'success' => true,
             'status' => true,
             'response'=> $adminList,
             'message' => 'List of Admins !'
         ]);
       }else{
         return Response()->json([
             'code'=> 400,
             'error' => true,
             'response'=> null,
             'status' => false,
             'message' => 'No Admin Found !'
         ]);
       }
     }

     public function emulateUser(Request $request){
       if(Auth::check()){
       $userId = $request->userId;
       $loginUserId = Auth::user()->id;
       //$loginUserId =1;
       $findUser = UserToken::where('user_id',$loginUserId)->first();
       if(count($findUser)!=0){
         $findUser->profile_user_id = $userId;
         $findUser->save();
         $loginUserToken = $findUser->token;
         return Response()->json([
            'code'=>200,
            'success' => true,
            'status' => true,
            'response'=>$loginUserToken,
            'message' => 'token for emulated user !'
          ]);
        }else{
          return Response()->json([
              'code'=>400,
              'error' => true,
              'status' => false,
              'message' => 'Sorry user not found !'
            ]);
          }
      }else{
        return Response()->json([
            'code'=>400,
            'error' => true,
            'status' => false,
            'message' => 'Please login to the system !'
          ]);
        }
  }

  public function blockUser(Request $request){
    $userId = $request->userId;
    $checkUser = Users::where('id',$userId)->first();
    if(count($checkUser)!=0){
      $checkUser->profile_status = 2 ; //status 2 for Block user
      if($checkUser->update()){
        $UserData = new Request;
        $UserData->userId = $userId; //User / admin ID
        $updateAdminTwilioCredential =  app(\App\Http\Controllers\TwilioController::class)
         ->suspandUserTwilioAccount($UserData);
        $updateAdminTwilioCredentialResponse = json_decode($updateAdminTwilioCredential->content(), true);
          if($updateAdminTwilioCredentialResponse['code'] == 200){
            \Log::info($updateAdminTwilioCredentialResponse['message']);
          }if($updateAdminTwilioCredentialResponse['code'] == 500){
            \Log::info($updateAdminTwilioCredentialResponse['message']);
          }
          return Response()->json([
              'code'=>200,
              'success' => true,
              'status' => true,
              'message' => 'User Blocked !'
          ]);
       }else{
         return Response()->json([
             'code'=>500,
             'success' => false,
             'status' => false,
             'message' => 'User Not Blocked try again later !'
         ]);
       }
     }else{
       return Response()->json([
            'code' => 400,
            'error' => true,
            'status' => false,
            'message' => 'User not found !'
          ]);
        }
  }

  public function unblockUser(Request $request){
    $userId = $request->userId;
    $checkUser = Users::where('id',$userId)->first();
    if(count($checkUser)!=0){
      $checkUser->profile_status = 1 ; //status 1 for Reactive Block user
      if($checkUser->update()){
        $UserData = new Request;
        $UserData->userId = $userId; //User / admin ID
        $updateAdminTwilioCredential =  app(\App\Http\Controllers\TwilioController::class)
         ->reactiveUserTwilioAccount($UserData);
        $updateAdminTwilioCredentialResponse = json_decode($updateAdminTwilioCredential->content(), true);
          if($updateAdminTwilioCredentialResponse['code'] == 200){
            \Log::info($updateAdminTwilioCredentialResponse['message']);
          }if($updateAdminTwilioCredentialResponse['code'] == 500){
            \Log::info($updateAdminTwilioCredentialResponse['message']);
          }
          return Response()->json([
              'code'=>200,
              'success' => true,
              'status' => true,
              'message' => 'User Unblocked !'
          ]);
       }else{
         return Response()->json([
             'code'=>500,
             'success' => false,
             'status' => false,
             'message' => 'User Not Unblock try again later !'
         ]);
       }
     }else{
       return Response()->json([
            'code' => 400,
            'error' => true,
            'status' => false,
            'message' => 'User not found !'
          ]);
        }
  }



}
