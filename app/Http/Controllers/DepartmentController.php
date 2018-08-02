<?php
/**
 * DepartmentController to manage CRUD operation of Department of admin & agents.
 * @param Request $request
 */
namespace App\Http\Controllers;

use App\Model\DepartmentAgentMap;
use Illuminate\Http\Request;
use Auth,Mail,Hash;
use Response;
use App\Model\UserToken; /* User Token Model */
use App\Model\Users;
use App\Model\Department;

class DepartmentController extends Controller
{
    /**
     * Create department of admin
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createDepartment(Request $request)
    {
        $userToken         = $request->token;
        $userId            = $request->userId;
        $departmentName    = $request->departmentName;
        $departmentDetails = $request->departmentDetails;
        $agentIds          = $request->agentIds;
        if( $userId != "" ) {

            $saveDepartment                     = new Department;
            $saveDepartment->department_name    = $departmentName;
            $saveDepartment->department_details = $departmentDetails;
            $saveDepartment->user_id            = $userId;
            $saveDepartment->status             = 1;

            if( $saveDepartment->save() ) {
                if (count($agentIds) > 0) {
                    foreach ($agentIds as $agentId) {
                        $departmentAgents = new DepartmentAgentMap();
                        $departmentAgents->department_id = $saveDepartment->id;
                        $departmentAgents->user_id = $agentId;
                        $departmentAgents->save();
                    }
                }
                return Response::json(array(
                    'status'  => true,
                    'code'    => 200,
                    'response'=> $saveDepartment,
                    'message' => 'Department saved !'
                ));

            } else {

                return Response::json(array(
                    'status'  => false,
                    'code'    => 400,
                    'response'=> [],
                    'message' => 'Department Not saved  !'
                ));

            }
        } elseif( $userToken != "" ) {

            $getUser  = UserToken::where('token',$userToken)->with('userInfo')->first();

            if( count($getUser) != 0 ) {

                $userId   = $getUser->profile_user_id;
                $userType = $getUser->userInfo->type;

                if ($userType == 2) {

                    $saveDepartment                     = new Department;
                    $saveDepartment->department_name    = $departmentName;
                    $saveDepartment->department_details = $departmentDetails;
                    $saveDepartment->user_id            = $userId;
                    $saveDepartment->status             = 1;

                    if( $saveDepartment->save() ) {
                        if (count($agentIds) > 0) {
                            foreach ($agentIds as $agentId) {
                                $departmentAgents = new DepartmentAgentMap();
                                $departmentAgents->department_id = $saveDepartment->id;
                                $departmentAgents->user_id = $agentId;
                                $departmentAgents->save();
                            }
                        }

                        return  Response::json(array(
                            'status'  => true,
                            'code'    => 200,
                            'response'=> $saveDepartment,
                            'message' => 'Department saved !'
                        ));

                    } else {

                        return  Response::json(array(
                            'status'  => false,
                            'code'    => 400,
                            'response'=> [],
                            'message' => 'Department Not saved  !'
                        ));

                    }
                } else {

                    return Response::json(array(
                        'status'  => false,
                        'code'    => 400,
                        'response'=> [],
                        'message' => 'Bad Request !'
                    ));

                }
            } else {

                return  Response::json(array(
                    'status'  => false,
                    'code'    => 400,
                    'response'=> [],
                    'message' => 'Invalid token !'
                ));

            }
        } else {

            return Response::json(array(
                'status'  => false,
                'code'    => 400,
                'response'=> [],
                'message' => 'Bad Request !'
            ));

        }
    }

    /**
     * Edit department
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editDepartment(Request $request)
    {

        $departmentId      = $request->departmentId;  //department id
        $departmentName    = $request->departmentName;  //department Name
        $departmentDetails = $request->departmentDetails; //Department Details
        $updateDepartment  = Department::find($departmentId);  //query for find department
        $agentIds = $request->agentIds;
        if( count($updateDepartment) !=0 ) {

            $updateDepartment->department_name    = $departmentName;
            $updateDepartment->department_details = $departmentDetails;

            if( $updateDepartment->save() ) {
                $deleteAgentDepartment = DepartmentAgentMap::where('department_id',$updateDepartment->id)->delete();
                if (count($agentIds) > 0) {
                    foreach ($agentIds as $agentId) {
                        $departmentAgents = new DepartmentAgentMap();
                        $departmentAgents->department_id = $updateDepartment->id;
                        $departmentAgents->user_id = $agentId;
                        $departmentAgents->save();
                    }
                }

                return  Response::json(array(
                    'status'  => true,
                    'code'    => 200,
                    'response'=> $updateDepartment,
                    'message' => 'Department Updated !'
                ));

            } else {

                return  Response::json(array(
                    'status'  => false,
                    'code'    => 400,
                    'response'=> [],
                    'message' => 'Department not Updated !'
                ));

            }
        } else {

            return  Response::json(array(
                'status'  => false,
                'code'    => 400,
                'response'=> [],
                'message' => 'Sorry Department not found !'
            ));

        }
    }

    /**
     * Get Details of a department
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function viewDepartment(Request $request)
    {

        $departmentId = $request->departmentId;

        if( $departmentId != "" ){

            $department = Department::where('id',$departmentId)->first();
            if( count($department) != 0 ) {
                $data['department'] = $department;
                $data['agents'] = $department->departmentAgents->pluck('user_id');
                return  Response::json(array(
                    'status'   => true,
                    'code'     => 200,
                    'response' => $data,
                    'message'  => 'Department Updated !'
                ));
            } else {

                return  Response::json(array(
                    'status'  => false,
                    'code'    => 400,
                    'response'=> [],
                    'message' => 'Sorry Department not found !'
                ));

            }
        } else {

            return  Response::json(array(
                'status'  => false,
                'code'    => 400,
                'response'=> [],
                'message' => 'Please select a department !'
            ));

        }
    }

    /**
     * Get lists of department
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function departmentList(Request $request)
    {

        $userToken = $request->token; //user Token
        $userId    = $request->userId; //user ID
        if( $userToken != "" ) {
            $checkUser  = UserToken::where('token',$userToken)->with('userInfo')->first();

            if( count($checkUser) != 0 ) {

                if( $checkUser->userInfo->type == 1 && $userId == "" ) { //Superadmin Department List

                    $department = Department::with('userDetails')->orderBy('created_at','desc')->get();

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

                if( $checkUser->userInfo->type == 1 && $userId != "" ) { //Superadmin Department List

                    $department = Department::where('user_id',$userId)->with('userDetails')->orderBy('created_at','desc')->get();

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

                    $department = Department::where('user_id',$checkUser->userInfo->id)->with('userDetails')->orderBy('created_at','desc')->get();

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
        } elseif ( $userId != ""){
            \Log::info('this is hit !!!!!!!!!!');
            //fetching the list of department for a specific user/admin
            $department = Department::where('user_id',$userId)->with('userDetails')->orderBy('created_at','desc')->get();

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
        } else {

            return  Response::json(array(
                'status'  => false,
                'code'    => 400,
                'response' => [],
                'message' => 'sorry no data found !'
            ));

        }
    }
}
