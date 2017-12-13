<?php
/**
* DepartmentController to manage CRUD operation of Department of admin & agents.
* @param Request $request
*/
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth,Mail,Hash;
use Response;
use App\Model\UserToken; /* User Token Model */
use App\Model\Messages;
use App\Model\Users;
use App\Model\ChatUsers;
use App\Model\Department;
use App\Events\SocketMessage;
use App\Model\DepartmentAgentMap;
use App\Model\ChatAgents;

class MessageController extends Controller
{
    /**
     * Create department of admin
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessage()
    {
       $message =Messages::all();
       return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $message,
            'message'  => 'All messages'
        ));
    }

    public function addMessage(Request $request)
    {
       $message =new Messages;
       $message->message = $request->message;
       $message->user = $request->user;
       $message->room_number = $request->roomNumber;
       //$message->from_number = $request->data['id'];
       $message->save();

       return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $message,
            'message'  => 'get messages'
        ));
    }

    public function addUser(Request $request)
    {
 
    	$check = ChatUsers::where('email', $request->data['email'])->get();
    	if(count($check)>0) {
    		$user = $check->first();
    	} else {
    		$user = new ChatUsers;
            $user->from_number = $request->fromNumber;
            $user->room_number = str_random(8);
	    	$user->name = $request->name;
	    	$user->email = $request->email;
	    	$user->department_id = $request->departmentId;
	    	$user->save();
    	}
    	

        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $user ,
            'message'  => 'User added'
        ));
    }


    public function getAgent()
    {
       $agent =Users::find(5);
       return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $agent,
            'message'  => 'Agent'
        ));
    }

    public function addAgents(Request $request)
    {
        $departmentId = $request->departmentId;
        $roomNumber  = $request->roomNumber;
        $agentList =DepartmentAgentMap::where('department_id', $departmentId )->get();

        foreach ($agentList as $list) {
            $agent = new ChatAgents;
            $agent->agent_id = $list->user_id;
            $agent->room_number = $roomNumber;
            $agent->save();
        }

        $agents = ChatAgents::where('room_number' , $roomNumber)->get();
        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $agents,
            'message'  => 'Agents'
        ));
    }


}
