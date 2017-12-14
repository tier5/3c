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
    	
        $departmentId = $request->departmentId;
        $roomNumber  = $user->room_number;
        $agentList =DepartmentAgentMap::where('department_id', $departmentId )->get();

        foreach ($agentList as $list) {
            $agent = new ChatAgents;
            $agent->agent_id = $list->user_id;
            $agent->room_number = $roomNumber;
            $agent->save();
        }

        $agents = ChatAgents::where('room_number' , $roomNumber)->get();


        $response= array (
            'id' => $user->id,
            'from_number' => $user->from_number,
            'name' => $user->name,
            'email' => $user->email,
            'department_id' => $user->department_id,
            'room_number' => $user->room_number,
            'agents'  => $agents
        );
        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $response ,
            'message'  => 'User added'
        ));
    }


    public function getAgents()
    {
        $agentsList = ChatAgents::where('agent_id', '!=', null)->groupBy('agent_id')->get();
        $all_agents = [];
        foreach ($agentsList as $list) {
            $rooms = ChatAgents::where('agent_id', $list->agent_id)->get();
            $all_rooms = [];
            $agents['agent_id'] = $list->agent_id;
            foreach($rooms as $room) {
                $agent_rooms['name']= $room->room_number;
                $agent_rooms['status'] = $room->status;
                $all_rooms[]= $agent_rooms;
            }
            $agents['rooms'] = $all_rooms;
            $all_agents[] = $agents;
            
        }

        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $all_agents,
            'message'  => 'Agent'
        ));
    }

    /** to accept the chat request by the agent */ 
    public function acceptRequest(Request $request)
    {
        $agent_id = $request->agentId;
        $room_number = $request->roomNumber;
        $agent = [];

        $all_agents = ChatAgents::where('room_number', $room_number)->get();

        foreach ($all_agents as $each_agent) {
            
            if($each_agent->agent_id == $agent_id) {
                $each_agent->status = 2;
                $each_agent->save();
                $agent = $each_agent;
            } else {
                $each_agent->delete();
            }
        }

        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $agent,
            'message'  => 'Agent'
        ));
    }


    /** to accept the chat request by the agent */ 
    public function rejectRequest(Request $request)
    {
        $agent_id = $request->agentId;
        $room_number = $request->roomNumber;
        
        $agents = ChatAgents::where('room_number', $room_number)
                                ->where('agent_id', $agent_id)
                                ->get();
        if(count($agents)>0) {
            foreach($agents as $agent) {
                $agent->delete();
            }
            
        }
        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => 'Request rejected',
            'message'  => 'Agent'
        ));
    }



}
