<?php
/**
* TwilioController to manage CRUD operation of Twilio account and sub-account.
* @param Request $request
*/
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth,Mail,Hash;
use Response;
use App\Model\UserToken;              /* User Token Model */
use App\Model\Users;                /* User Model */
use App\Model\TwilioCredentials;  /* Twilio Credentials Model */
use Twilio\Rest\Client; /* Twilio REST client */

class TwilioController extends Controller
{

  /**
  * Store Twilio Information of an user
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function storeTwilioInformation(Request $request)
  {
    $userToken = $request->token; //userToken generated in login Time
    $sid       = $request->twilio_sid; //twilio_sid
    $token     = $request->twilio_token; //twilio_token
    $getUser   = UserToken::where('token',$userToken)->with('userInfo')->first();

    if(count($getUser) != 0 ){

        $client  = new Client($sid, $token);
        $account = $client->api->accounts($sid)->fetch();

        if(count($account)!=0){

            $saveTwilioCredential                       = new TwilioCredentials;
            $saveTwilioCredential->user_id              = $getUser->profile_user_id;
            $saveTwilioCredential->twilio_friendly_name = $account->friendlyName;
            $saveTwilioCredential->twilio_sid           = $sid;
            $saveTwilioCredential->twilio_token         = $token;
            $saveTwilioCredential->status               = $account->status;
            $saveTwilioCredential->type                 = $getUser->userInfo->type;

            if($saveTwilioCredential->save()){

              return  Response::json(array(
                  'error'   => false,
                  'status'  => true,
                  'code'    => 200,
                  'response'=> $saveTwilioCredential,
                  'message' => 'Twilio Credentials Save !'
              ));

            }
        }
      } else {

          return Response::json(array(
              'error'   => true,
              'status'  => false,
              'code'    => 400,
              'response'=> null,
              'message' => 'No User Found !'
          ));

      }
  }

  /**
  * Get Twilio Information of an user
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function getTwilioInformation(Request $request)
  {
    $userToken = $request->token;

    if($userToken !=""){

        $getUser = UserToken::where('token',$userToken)->with('userInfo')->first();

        if(count($getUser) != 0 ){

          $getTwilioCredentials = TwilioCredentials::where('user_id',$getUser->userInfo->id)->first();

            if(count($getTwilioCredentials)!=0){

              return  Response::json(array(
                  'status'   => true,
                  'error'    => false,
                  'code'     => 200,
                  'response' => $getTwilioCredentials,
                  'message'  => 'Twilio Credentials !'
              ));

            } else {

              return  Response::json(array(
                  'error'   => true,
                  'status'  => false,
                  'code'    => 400,
                  'response'=> null,
                  'message' => 'Sorry Twilio Credentials no found !'
              ));

            }
        } else {

           return  Response::json(array(
              'error'   => true,
              'status'  => false,
              'code'    => 400,
              'response'=> null,
              'message' => 'Sorry user not found !'
           ));

        }
    } else {

      return  Response::json(array(
          'error'   => true,
          'status'  => false,
          'code'    => 400,
          'response'=> null,
          'message' => 'Please Provide a Token !'
      ));

    }
  }

  /**
  * create twilio information of an user
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function createTwilioSubacount(Request $request)
  {
    $userId                         = $request->userId;
    $FriendlyName                   = $request->email;
    $getSuperAdminTwilioCredentials = TwilioCredentials::where('type',1)->first();

    if(count($getSuperAdminTwilioCredentials)!=0){

      // Your Account Sid and Auth Token from twilio.com/user/account
      try{

        $sid     = $getSuperAdminTwilioCredentials->twilio_sid;
        $token   = $getSuperAdminTwilioCredentials->twilio_token;
        $client  = new Client($sid, $token);
        $account = $client->api->accounts->create(array(
            'FriendlyName' => $FriendlyName
        ));

        if(count($account)!=0){

          //store the data
          $saveTwilioCredentials                       = new TwilioCredentials;
          $saveTwilioCredentials->twilio_friendly_name = $account->friendlyName;
          $saveTwilioCredentials->twilio_sid           = $account->sid;
          $saveTwilioCredentials->twilio_token         = $account->authToken;
          $saveTwilioCredentials->user_id              = $userId;
          $saveTwilioCredentials->type                 = 2; //Admin Account
          $saveTwilioCredentials->status               = $account->status;

          if($saveTwilioCredentials->save()){

            return  Response::json(array(
                'code'    => 200,
                'error'   => false,
                'status'  => true,
                'response'=> $saveTwilioCredentials,
                'message' => 'Twilio Credentials Created !'
            ));

          } else {

            return  Response::json(array(
                'error'   => true,
                'status'  => false,
                'code'    => 400,
                'response'=> null,
                'message' => 'Sorry Twilio Credentials not Created !'
            ));

          }
        }
      }catch(\Exception $e){

        return  Response::json(array(
            'error'   => true,
            'code'    => 400,
            'status'  => false,
            'response'=> null,
            'message' => $e->getMessage()
        ));

        \Log::info('Exception ->'.$e->getMessage());

      }
    } else {

        return  Response::json(array(
            'error'   => true,
            'code'    => 400,
            'status'  => false,
            'response'=> null,
            'message' => 'Sorry Twilio Credentials not found !'
        ));

    }
  }

  /**
  * Suspend of twilio account of an user
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function suspandUserTwilioAccount(Request $request)
  {
    $userId                    = $request->userId;
    $getAdminTwilioCredentials = TwilioCredentials::where('user_id',$userId)->first();

    if( count($getAdminTwilioCredentials) !=0 ){

      try{

        $sid     = $getAdminTwilioCredentials->twilio_sid;
        $token   = $getAdminTwilioCredentials->twilio_token;
        $client  = new Client($sid, $token);
        $account = $client->api->accounts($sid)->update(array(
            'status' => 'suspended'
        ));

        if(count($account)!=0){

          //update the data
          $getAdminTwilioCredentials->twilio_friendly_name = $account->friendlyName;
          $getAdminTwilioCredentials->twilio_sid           = $account->sid;
          $getAdminTwilioCredentials->twilio_token         = $account->authToken;
          $getAdminTwilioCredentials->user_id              = $userId;
          $getAdminTwilioCredentials->type                 = 2; //Admin Account
          $getAdminTwilioCredentials->status               = $account->status;

          if($getAdminTwilioCredentials->update()){

            return  Response::json(array(
                'code'    => 200,
                'error'   => false,
                'status'  => true,
                'response'=> $getAdminTwilioCredentials,
                'message' => 'Twilio Credentials Updated !'
            ));

          } else {

            return  Response::json(array(
              'error'   => true,
              'status'  => false,
              'code'    => 400,
              'response'=> null,
              'message' => 'Sorry Twilio Credentials not Updated !'
            ));

          }
        }
      }catch(\Exception $e){

        return  Response::json(array(
            'error' => true,
            'code' => 400,
            'status' => false,
            'response'=> null,
            'message' => $e->getMessage()
        ));

        \Log::info('Exception ->'.$e->getMessage());

      }
    } else {

        return  Response::json(array(
          'error'   => true,
          'code'    => 400,
          'status'  => false,
          'response'=> null,
          'message' => 'Sorry Twilio Credentials not found !'
        ));
    }
  }

  /**
  * Reactive of users's twilio account
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function reactiveUserTwilioAccount(Request $request)
  {
    $userId                         = $request->userId;
    $getSuperAdminTwilioCredentials = TwilioCredentials::where('type',1)->first();
    $getAdminTwilioCredentials      = TwilioCredentials::where('user_id',$userId)->first();

    if(count($getSuperAdminTwilioCredentials)!=0 && count($getAdminTwilioCredentials) !=0 ){

      try{

        $sid         = $getAdminTwilioCredentials->twilio_sid;
        $token       = $getAdminTwilioCredentials->twilio_token;
        $masterSid   = $getSuperAdminTwilioCredentials->twilio_sid; //To Reactive a suspended twilio account we need the master Account credentials
        $masterToken = $getSuperAdminTwilioCredentials->twilio_token;
        $client      = new Client($masterSid, $masterToken);
        $account     = $client->api->accounts($sid)->update(array(
            'status' => 'active'
        ));

        if(count($account)!=0) {

          //update the data
          $getAdminTwilioCredentials->twilio_friendly_name = $account->friendlyName;
          $getAdminTwilioCredentials->twilio_sid           = $account->sid;
          $getAdminTwilioCredentials->twilio_token         = $account->authToken;
          $getAdminTwilioCredentials->user_id              = $userId;
          $getAdminTwilioCredentials->type                 = 2; //Admin Account
          $getAdminTwilioCredentials->status               = $account->status;

          if($getAdminTwilioCredentials->update()){

            return  Response::json(array(
                'code'    => 200,
                'error'   => false,
                'status'  => true,
                'response'=> $getAdminTwilioCredentials,
                'message' => 'Twilio Credentials Updated !'
            ));

          }else{

            return  Response::json(array(
                'error'   => true,
                'status'  => false,
                'code'    => 400,
                'response'=> null,
                'message' => 'Sorry Twilio Credentials not Updated !'
            ));

          }
        }
      } catch(\Exception $e){

        return  Response::json(array(
            'error'   => true,
            'code'    => 400,
            'status'  => false,
            'response'=> null,
            'message' => $e->getMessage()
        ));

        \Log::info('Exception ->'.$e->getMessage());

      }
    } else {

        return  Response::json(array(
          'error'   => true,
          'code'    => 400,
          'status'  => false,
          'response'=> null,
          'message' => 'Sorry Twilio Credentials not found !'
        ));

    }
  }
  /**
  * Validate Twilio Credentials of superadmin twilio account
  * @return \Illuminate\Http\JsonResponse
  */
  public function validateTwilioCredentials()
  {
    $getSuperAdminTwilioCredentials = TwilioCredentials::where('type',1)->where('status','active')->first();

    if( count($getSuperAdminTwilioCredentials) !=0 ) {

      return Response::json(array(
        'status'   => true,
      ));

    } else {

      return Response::json(array(
        'status'   => false,
      ));

    }
  }
  /**
  * Twilio Account and Subaccount list
  * @return \Illuminate\Http\JsonResponse
  */
  public function twilioAccountList()
  {
    $getTwilioAccountList = TwilioCredentials::with('userInfo')->get();

    if( count($getTwilioAccountList) !=0 ){

      return Response::json(array(
        'code'    => 200,
        'error'   => false,
        'status'  => true,
        'response'=> $getTwilioAccountList,
        'message' => 'Twilio Credential List !'
      ));

    } else {

      return Response::json(array(
        'code'    => 400,
        'error'   => false,
        'status'  => false,
        'response'=> [],
        'message' => 'Empty Twilio Credential List !'
      ));

    }
  }


}
