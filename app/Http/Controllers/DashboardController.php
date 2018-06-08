<?php

namespace App\Http\Controllers;

use App\Model\DepartmentAgentMap;
use App\Model\MessageAgentTrack;
use App\Model\TwilioNumber;
use Illuminate\Http\Request;
use Response;
use App\Model\Widgets;
use App\Model\Users;
use App\Model\Department;
use App\Model\WidgetDepartmentMapping;
use App\Model\WidgetScheduleMapping;
use App\Model\MessageTrack;
use App\Model\ContactList;
use App\Model\MessageLog;
use App\Model\ChatThread;
use App\Model\MessageCache;
use App\Model\MessageCacheData;
use App\Model\MessageForwardCounter;
use App\Http\Controllers\TwilioController;
use Helper;
use Twilio\Rest\Client;                         /* Twilio REST client */
use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use Illuminate\Database\QueryException;

class DashboardController extends Controller
{
    /**
     * Function to get count of the user activity
     * @param Request $request
     */
    public function getDashboardCount(Request $request){
        $userToken = $request->token; //user Token
        $userId    = $request->userId; //user ID

        if( $userToken != "" ) {
            $checkUser  = UserToken::where('token',$userToken)->with('userInfo')->first();

            if( count($checkUser) != 0 ) {

                if( $checkUser->userInfo->type == 1 && $userId == "" ) { //Superadmin with no user id
                    \Log::info('This is Superadmin with $userId == "" ');

                    $dashboardItemCount = DB::statement("SELECT (SELECT COUNT(*)FROM department) AS departmentCount, (SELECT COUNT(*)FROM widgets) AS widgetsCount FROM user where type=2");

                    $department = Department::with('userDetails')->get();
                    // this will come as superadmin

                    if(count($department) != 0){

                        return  Response::json(array(
                            'status'   => true,
                            'code'     => 200,
                            'response' => $department,
                            'message'  => 'Department List!'
                        ));

                    } else {

                        return  Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'response' => [],
                            'message'  => 'Sorry Department not found !'
                        ));

                    }
                }

                if( $checkUser->userInfo->type == 1 && $userId != "" ) { // Emulate Superadmin with an id

                    $department = Department::where('user_id',$userId)->with('userDetails')->get();

                    if(count($department) != 0){

                        return  Response::json(array(
                            'status'   => true,
                            'code'     => 200,
                            'response' => $department,
                            'message'  => 'Department List!'
                        ));

                    } else {

                        return  Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'response' => [],
                            'message'  => 'Sorry Department not found !'
                        ));

                    }
                }

                if( $checkUser->userInfo->type == 2 ) { //Admin Department List
                    \Log::info('This is Admin');
                    $department = Department::where('user_id',$checkUser->userInfo->id)->with('userDetails')->get();

                    if( count($department) != 0 ) {

                        return  Response::json(array(
                            'status'   => true,
                            'code'     => 200,
                            'response' => $department,
                            'message'  => 'Department List!'
                        ));

                    } else {

                        return  Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'response' => [],
                            'message'  => 'Sorry Department not found !'
                        ));
                    }
                }
            } else {

                return  Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'response' => [],
                    'message'  => 'Invalid Token !'
                ));

            }
        }
    }

}
