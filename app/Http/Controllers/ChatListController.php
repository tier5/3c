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

class ChatListController extends Controller
{
    public function agentDepartmentList(Request $request)
    {
        $chatRoomId = $request->chatRoomId;
        if($chatRoomId != "" ){
            $getDepartmentDetails = MessageAgentTrack::where('chat_room_id',$chatRoomId)->with('getWidget.widgetDepartment.departmentDetails.departmentAgents.agentDetails')->first();
            $getOtherAgents = Widgets::where('widget_uuid',$getDepartmentDetails->widget_id)->with('agentDetails')->get();

            $agentDepartmentData = [];
            $agentArr = [];
            if(count($getDepartmentDetails) != 0){
                foreach($getDepartmentDetails->getWidget->widgetDepartment as $key=>$data){
                    $agentDepartmentData[$key]['department_id']=$data->departmentDetails->id;
                    $agentDepartmentData[$key]['department_name']=$data->departmentDetails->department_name;
                    foreach($data->departmentDetails->departmentAgents as $newData){
                        foreach($newData->agentDetails as $agentDetail){
                            $agentDepartmentData[$key]['agent_id']=$agentDetail->id;
                            $agentDepartmentData[$key]['first_name']=$agentDetail->first_name;
                            $agentDepartmentData[$key]['last_name']=$agentDetail->last_name;
                        }

                    }
                }
                if(count($getOtherAgents) !=0 ){
                foreach($getOtherAgents as $key=>$data){
                        foreach($data->agentDetails as $agentData){
                            $agentArr[$key]['agent_id']=$agentData->id;
                            $agentArr[$key]['first_name']=$agentData->first_name;
                            $agentArr[$key]['last_name']=$agentData->last_name;
                        }
                    }
                }
                $agentDepartmentData['agents']=$agentArr;
                $response = array('code'=>200,'error'=>false,'response'=>$agentDepartmentData,'status'=>true,'message'=>'Agent Department List !');
            }else{
                $response = array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'No Data Found !');
            }
        }else{
            $response = array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Invalid Data !');
        }
        return Response()->json($response);
    }

    public function getContactList(Request $request)
    {
        $agentId = $request->agentId;
        if($agentId != ""){

            $clientNames = MessageAgentTrack::where('agent_id', $agentId)->with('clientInfo.clientName')->where('status','!=',5)->get();
            if(count($clientNames) != 0 ){

                $response = array('code'=>200,'error'=>false,'response'=>$clientNames,'status'=>true,'message'=>'List of client names !');
            } else {

                $response = array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'No Client Found !');
            }
        }else{

            $response = array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Invalid Token !');
        }

        return Response()->json($response);
    }

    public function agentWithAllChats(Request $request)
    {
        $agentId = $request->agentId;
        $allAgents = [];

            $rooms = MessageAgentTrack::where('agent_id', $agentId)->with('clientInfo.clientName','allChat.agentInfo')->where('status','!=',5)->get();
            $allRooms = [];
            $agents['agent_id'] = $agentId;
            foreach($rooms as $room) {
                $agentRooms['name'] = $room->chat_room_id;
                $agentRooms['status'] = $room->status;
                if($room->clientInfo->clientName->name !="" ) {
                    $agentRooms['client_name'] = $room->clientInfo->clientName->name;
                } else {
                    $agentRooms['client_name'] = $room->clientInfo->clientName->phone;
                }
                $agentRooms['chats']=array();
                foreach($room->allChat as $key=>$chat){

                    $agentRooms['chats'][$key]['message'] = $chat->chat_thread;
                    $agentRooms['chats'][$key]['direction'] = $chat->direction;
                    $agentRooms['chats'][$key]['roomNo'] = $room->chat_room_id;
                    if($chat->direction == 1){
                        if($room->clientInfo->clientName->name !="" ) {
                            $agentRooms['chats'][$key]['user'] = $room->clientInfo->clientName->name;
                        } else {
                            $agentRooms['chats'][$key]['user'] = $room->clientInfo->clientName->phone;
                        }
                    }if($chat->direction == 2){
                        $agentRooms['chats'][$key]['user'] = $chat->agentInfo->first_name;
                    }
                    $agentRooms['chats'][$key]['created_at'] = $chat->created_at;
                }
                $allRooms[]= $agentRooms;

            }
            $agents['rooms'] = $allRooms;
            $allAgents[] = $agents;

        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $allAgents,
            'message'  => 'Agents with chatrooms !'
        ));
    }
}
