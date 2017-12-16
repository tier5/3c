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

class ChatController extends Controller
{
    /**
     * function to check incoming message from the mobile phone
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function checkMessage(Request $request)
    {
        //Variable Declaration
        $fromNumber     = $request->fromNumber; //client Number
        $toNumber       = $request->toNumber;   //widget Number
        $messageBody    = $request->messageBody;

        $checkTwilioNumbers = TwilioNumber::where('number',$toNumber)->with('getWidgetDetails')->first();
        if(count($checkTwilioNumbers) != 0 ){

                $checkMessageTrack = MessageTrack::where('widget_id',$checkTwilioNumbers->getWidgetDetails->widget_uuid)->where('from_phone_number',$fromNumber)->where('status',1)->first();
                if( count($checkMessageTrack) == 0 ){

                    $this->checkMessageCache($fromNumber,$checkTwilioNumbers->getWidgetDetails->widget_uuid,$messageBody);
                } else {

                    $type ='1';
                    $direction ='1';
                    $this->saveOtherChat($fromNumber,$checkTwilioNumbers->getWidgetDetails->widget_uuid,$messageBody,$type, $direction);
                }
            }else{

                return  Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'response' => [],
                    'error'    => true,
                    'message'  => 'Twilio Number Not Found !'
                ));
            }
    }

    /**
     * function to check message cache
     *
     * @param fromNumber,widgetUuid,messageBody
     * @return \Illuminate\Http\JsonResponse
     */

    public function checkMessageCache($fromNumber,$widgetUuid,$messageBody)
    {
        if($fromNumber != "" && $widgetUuid !=""){

            $checkMessageCache = MessageCache::where('from_phone_number',$fromNumber)->where('widget_uuid',$widgetUuid)->first();
            if(count($checkMessageCache) != 0 ){

                if($checkMessageCache->status == 1){

                    $this->checkMessageContain($messageBody,$fromNumber,$widgetUuid,$checkMessageCache->id);

                }else{
                    //$this->checkMessageContain($messageBody,$fromNumber,$widgetUuid,$checkMessageCache->id);

                }

            }else{

                $responseMessageCacheId = $this->saveMessageCache($fromNumber, $widgetUuid);
                if($responseMessageCacheId != false){

                    $responseMessageCacheData = $this->saveMessageCacheData($messageBody, $responseMessageCacheId );
                    if($responseMessageCacheData == true ){

                        $this->createSmsTemplate($fromNumber, $widgetUuid);
                    }else{

                        return  Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'response' => [],
                            'error'    => true,
                            'message'  => 'data Not Saved !'
                        ));
                    }

                }else{

                    return  Response::json(array(
                        'status'   => false,
                        'code'     => 400,
                        'response' => [],
                        'error'    => true,
                        'message'  => 'data Not Saved !'
                    ));
                }
            }
        }else{

            return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'error'    => true,
                'message'  => 'please send require data !'
            ));
        }

    }

    /**
     * function to check incoming message contain
     *
     * @param messageBody,fromNumber,widgetUuid,checkMessageCacheId
     * @return \Illuminate\Http\JsonResponse
     */

    public function checkMessageContain($messageBody,$fromNumber,$widgetUuid,$checkMessageCacheId)
    {
        if( $messageBody != "" && $fromNumber !="" && $widgetUuid !="" ){
            $checkWidget = Widgets::where('widget_uuid',$widgetUuid)->first();
            $messageResponse = $this->ctype_int($messageBody);
            if( $messageResponse == 'true' ){
                $departmentId = $messageBody;

                $checkDepartment = WidgetDepartmentMapping::where('department_orders',$departmentId)->where('widget_id',$checkWidget->id)->first();
                if(count($checkDepartment)!=0){
                     $updateMessageCache        = MessageCache::where('id',$checkMessageCacheId)->update(['department_id'=>$checkDepartment->department_id,'status'=>'0']);
                     $responsesaveMessageTrack  = $this->saveMessageTrack($checkDepartment->department_id, $fromNumber, $widgetUuid);
                     if( $responsesaveMessageTrack != false ){
                        $responseSaveContactList = $this->saveContactList($widgetUuid,$fromNumber);
                        if($responseSaveContactList != false ){
                            $responsesaveMessageLog = $this->saveMessageLog($responseSaveContactList,$widgetUuid);
                            if($responsesaveMessageLog!=false){
                                $type = '1'; // 1-> Mobile 2-> Web
                                $direction = '1'; // 1->Incoming 2-> outgoing
                                $userId = $responsesaveMessageTrack->agent_id;
                                $fetchMessageBodyFromMessageCacheData = MessageCacheData::where('message_cache_id',$checkMessageCacheId)->select('message_body')->get();
                                if(count($fetchMessageBodyFromMessageCacheData) != 0 ){

                                    foreach($fetchMessageBodyFromMessageCacheData as $data){
                                        $this->saveChatThread($responsesaveMessageLog,$widgetUuid,$data->message_body,$type,$direction,$userId);
                                    }
                                }
                                $this->chatProcess($fromNumber, $widgetUuid);   //calling chat process
                            }

                        }
                     }else{

                         return  Response::json(array(
                             'status'   => false,
                             'code'     => 400,
                             'response' => [],
                             'error'    => true,
                             'message'  => 'data Not Saved !'
                         ));
                     }
                }else{

                    return  Response::json(array(
                        'status'   => false,
                        'code'     => 400,
                        'response' => [],
                        'error'    => true,
                        'message'  => 'department not found !'
                    ));
                }
            } else {

                $checkMessageCache = MessageCache::where('from_phone_number',$fromNumber)->where('widget_uuid',$widgetUuid)->where('status',1)->first();
                $responseMessageCacheData = $this->saveMessageCacheData($messageBody, $checkMessageCache->id );

                if($responseMessageCacheData == true ){

                    $this->createSmsTemplate($fromNumber, $widgetUuid);
                }else{
                    return  Response::json(array(
                        'status'   => false,
                        'code'     => 400,
                        'response' => [],
                        'error'    => true,
                        'message'  => 'data Not Saved !'
                    ));
                }
            }
        } else {

            return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'error'    => true,
                'message'  => 'Sorry !'
            ));
        }
    }

    /**
     * function to check message input
     *
     * @param text
     * @return binary(true or false)
     */
    function ctype_int($text)
    {
        return preg_match('/^-?[0-9]+$/', (string)$text) ? true : false;
    }

    /**
     * function to check Create sms template
     *
     * @param text
     * @return binary(true or false)
     */

    public function createSmsTemplate( $fromNumber,$widgetUuid )
    {
        if( $fromNumber != "" && $widgetUuid != "" ){
            $getWidgetData = Widgets::where('widget_uuid',$widgetUuid)->with('twilioNumbers','widgetDepartment.departmentDetails')->first();
            if( count($getWidgetData->widgetDepartment)!=0 ){
                $smsBody = "Please Choose a Department from the list ...";
                foreach($getWidgetData->widgetDepartment as $data){
                    $smsBody.="\n";
                    $smsBody.= $data->department_orders;
                    $smsBody.=" - ";
                    $smsBody.= $data->departmentDetails->department_name;
                }
                $smsBody.="\n";
                $smsBody.="Please Reply with the Number only.";
                $smsBody.="\n";
                $smsBody.="Thanks";
                $this->sendSms( $smsBody, $fromNumber, $getWidgetData->twilioNumbers->number);
            }else{

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Data not found !'
                ));
            }
        }else{
            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to send sms to the from number
     *
     * @param smsBody, fromNumber, toNumber
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSms($smsBody , $toNumber,$fromNumber)
    {
        if($smsBody !="" && $toNumber!="" && $fromNumber !="") {
            $keys = TwilioNumber::where('number', $fromNumber)->with('getTwilioCredentials')->first();
            $fromNumber = $keys->prefix.$keys->number;
            if ($keys) {
                try {
                        $sid = $keys->getTwilioCredentials->twilio_sid;
                        $token = $keys->getTwilioCredentials->twilio_token;
                        $clientsms = new Client($sid, $token);
                        $message = $clientsms->messages->create(
                            $toNumber,array(
                                  "from" => $fromNumber,
                                  "body" => $smsBody
                        ));
                        \Log::info('SMS Send !');
                    } catch(\Exception $e) {
                        \Log::info('SMS Not Send !'.$e->getMessage());
                        return  Response::json(array(
                            'error'   => true,
                            'code'    => 400,
                            'status'  => false,
                            'response'=> [],
                            'message' => $e->getMessage()
                        ));
                    }
            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Sorry Data not found !'
                ));
            }
        }else{

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save message cache table
     *
     * @param fromNumber, widgetUuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveMessageCache($fromNumber, $widgetUuid)
    {
        if($fromNumber !="" && $widgetUuid != ""){
            $saveMessageCache = new MessageCache;
            $saveMessageCache->widget_uuid = $widgetUuid;
            $saveMessageCache->from_phone_number = $fromNumber;
            $saveMessageCache->status = 1;
            if($saveMessageCache->save()){
                return $saveMessageCache->id;
            }else{
                return false;
            }
        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save message cache data table
     *
     * @param messageBody, responseMessageCacheId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveMessageCacheData($messageBody, $responseMessageCacheId)
    {
        if($messageBody !="" && $responseMessageCacheId != ""){
            $saveMessageCacheData = new MessageCacheData;
            $saveMessageCacheData->message_cache_id = $responseMessageCacheId;
            $saveMessageCacheData->message_body = $messageBody;
            $saveMessageCacheData->status = 1;
            if($saveMessageCacheData->save()){
               return true;
            }else{
                return false;
            }
        }else{
            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save message_track table
     *
     * @param departmentId, fromNumber, widgetUuid
     * @return \Illuminate\Http\JsonResponse
     */

    public function saveMessageTrack($departmentId, $fromNumber, $widgetUuid)
    {
        if($departmentId != "" && $fromNumber !="" && $widgetUuid !=""){
            $saveMessageTrack = new MessageTrack;
            $saveMessageTrack->widget_id = $widgetUuid;
            $saveMessageTrack->department_id = $departmentId;
            $saveMessageTrack->from_phone_number = $fromNumber;
            $saveMessageTrack->status = 1;
            if($saveMessageTrack->save()){
                return $saveMessageTrack;
            }else{
                return false;
            }
        }else{

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save contact_list table
     *
     * @param departmentId, fromNumber, widgetUuid,name,email
     * @return \Illuminate\Http\JsonResponse
     */

    public function saveContactList( $widgetUuid, $fromNumber, $name=null , $email=null )
    {
        if($widgetUuid!="" && $fromNumber!=""){
            $checkContactList = ContactList::where('widget_id',$widgetUuid)->where('phone',$fromNumber)->first();
            if( count($checkContactList) == 0 ){
                $saveContactList            =   new ContactList;
                $saveContactList->phone     =   $fromNumber;
                $saveContactList->widget_id =   $widgetUuid;
                $saveContactList->name      =   $name;
                $saveContactList->email     =   $email;
                $saveContactList->save();
                return $saveContactList->id;
            }else{
                return $checkContactList->id;
            }

        }else{

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save message_log table
     *
     * @param saveContactListId,widgetUuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveMessageLog($saveContactListId,$widgetUuid)
    {
        if( $saveContactListId != "" && $widgetUuid != "" ){
            $checkMessageLog = MessageLog::where('widget_id',$widgetUuid)->where('contact_list_id',$saveContactListId)->where('status' , 3 )->first();
            if(count($checkMessageLog) == 0){

                $saveMessageLog = new MessageLog;
                $saveMessageLog->widget_id = $widgetUuid;
                $saveMessageLog->contact_list_id = $saveContactListId;
                if($saveMessageLog->save()){

                    return $saveMessageLog->id;
                } else {

                    return false;
                }
            } else {
                return $checkMessageLog->id;

            }
        }else{

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to save chat_thread table
     *
     * @param responseSaveContactList,widgetUuid,messageBody,type,direction,userId
     * @return \Illuminate\Http\JsonResponse
     */

    public function saveChatThread( $responseSaveContactList,$widgetUuid,$messageBody,$type,$direction,$userId)
    {
        if($responseSaveContactList !="" && $widgetUuid != "" && $messageBody !="" ){

            $saveChatThread                 = new ChatThread;
            $saveChatThread->message_log_id = $responseSaveContactList;
            $saveChatThread->widget_id      = $widgetUuid;
            $saveChatThread->chat_thread    = $messageBody;
            $saveChatThread->user_id        = $userId;
            $saveChatThread->type           = $type;
            $saveChatThread->direction      = $direction;
            $saveChatThread->chat_type      = $type;
            if($saveChatThread->save()){

                return $saveChatThread;
            }else{
                return false;
            }
        }
    }

    /**
     * function to save chat_thread for other incoming chat messagestable
     *
     * @param responseSaveContactList,widgetUuid,messageBody,type,direction,userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveOtherChat( $fromNumber, $widget_uuid, $messageBody, $type, $direction)
    {
        if( $fromNumber !="" && $widget_uuid!="" ){
            $getContactListId = ContactList::where('widget_id',$widget_uuid)->where('phone',$fromNumber)->select('id')->with('messageLogDetails')->first();
            if(count($getContactListId) != 0){

                $saveChatThread                 = new ChatThread;
                $saveChatThread->message_log_id = $getContactListId->messageLogDetails->id;
                $saveChatThread->widget_id      = $widget_uuid;
                $saveChatThread->chat_thread    = $messageBody;
                $saveChatThread->type           = $type;
                $saveChatThread->direction      = $direction;
                $saveChatThread->chat_type      = $type;
                if($saveChatThread->save()){

                    return true;
                }else{
                    return false;
                }
            }else{

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'No Data Found !'
                ));
            }
        }else{

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Sorry paramiters are not present in the request !'
            ));
        }
    }

    /**
     * function to check the message comming from the web js client
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */

    public function checkWebMessage(Request $request)
    {
        //Variable Declaration
        $fromNumber     = $request->fromNumber;
        $departmentId   = $request->departmentId;
        $name           = $request->name;
        $email          = $request->email;
        $widgetUuid     = $request->widgetUuid;

        $checkMessageTrack = MessageTrack::where('widget_id',$widgetUuid)->where('from_phone_number',$fromNumber)->where('status',1)->first();
        if(count($checkMessageTrack) == 0 ){
            $saveMessageTrack  = new MessageTrack;
            $saveMessageTrack->widget_id = $widgetUuid;
            $saveMessageTrack->department_id = $departmentId;
            $saveMessageTrack->from_phone_number = $fromNumber;
            $saveMessageTrack->status = 1;
            if($saveMessageTrack->save()){

                $responsesaveContactList = $this->saveContactList( $widgetUuid, $fromNumber, $name, $email );
                if($responsesaveContactList != 0 ){
                    $responsesaveMessageLog = $this->saveMessageLog( $responsesaveContactList, $widgetUuid);
                    if($responsesaveMessageLog != false ){

                        $updateMessageTrack = MessageTrack::where('id',$saveMessageTrack->id)->update(['message_id' =>$responsesaveMessageLog ]);
                        $chatRoomId = $this->chatProcess($fromNumber, $widgetUuid);   //calling chat process
                        //call a funtion to fetch  all the agents with there corrosponding room id and status
                        $response['chatRoomId'] = $chatRoomId ;
                        $response['name'] = $name  ;
                        $response['email'] = $email  ;
                        $response['name'] = $name  ;

                        return Response::json(array(
                            'status'   => true,
                            'code'     => 200,
                            'error'    => false,
                            'response' => $response,
                            'message'  => 'Chatroom No !'
                        ));

                    }

                } else {

                    return Response::json(array(
                        'status'   => false,
                        'code'     => 400,
                        'error'    => true,
                        'response' => [],
                        'message'  => 'Something Went wrong !'
                    ));
                }

            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Something Went wrong !'
                ));
            }
        } else {
            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'No Data Found !'
            ));
        }


    }

    /**
     * function to check the message content and update/insert data on message_track,chat_thread table
     *  make a Route for this
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function CheckWebChatMessage(Request $request)
    {
        $chatRoomId     = $request->chatRoomId;
        $messageBody    = $request->messageBody;
        $direction      = $request->direction;  // 1->Incoming 2-> outgoing
        if( $chatRoomId !="" ){

            $checkMessageTrack = MessageTrack::where('chat_room_id', $chatRoomId)->first();
            if(count($checkMessageTrack)!=0){
            $messageId  = $checkMessageTrack->message_id;
            $userId     = $checkMessageTrack->agent_id;
            $widgetUuid = $checkMessageTrack->widget_id;
            $type       = 2; //1->mobile 2->web
            $responseSaveChatThread = $this->saveChatThread($messageId, $widgetUuid, $messageBody, $type, $direction, $userId);
            if($responseSaveChatThread->direction == 1){
                //user contain client info
                $getClientInfo = MessageLog::where('id',$responseSaveChatThread->message_log_id)->with('clientName')->first();
                    if($getClientInfo->clientName->name !="" ) {
                        $user = $getClientInfo->clientName->name;
                    } else {
                        $user = $getClientInfo->clientName->phone;
                    }
                }if($responseSaveChatThread->direction == 2){
                    //user contain Agent info
                    $getAgentInfo = ChatThread::where('id',$responseSaveChatThread->id)->with('agentInfo')->first();
                    $user = $getAgentInfo->agentInfo->first_name;
                }

            $response = ['message'=>$responseSaveChatThread->chat_thread,
                       'direction'=>$responseSaveChatThread->direction,
                       'roomNo'=>$messageId,
                       'user'=>$user,
                       'created_at' => $responseSaveChatThread->created_at];

            return Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $response,
                'message'  => 'Message sent !'
            ));
            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Message Not send !'
                ));
            }
        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'No data found !'
            ));
        }
    }

    /**
     * function to start chat process
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function chatProcess($fromNumber, $widgetUuid)
    {
        if($fromNumber !="" && $widgetUuid != "") {
            $checkMessageTrack = MessageTrack::where('widget_id', $widgetUuid)->where('from_phone_number', $fromNumber)->where('status', 1)->first();

            if (count($checkMessageTrack) != 0) {
                $chatRoomId = $this->generateRandomString();
                $checkMessageTrack->chat_room_id = $chatRoomId;
                if ($checkMessageTrack->update()) {
                    $departmentId = $checkMessageTrack->department_id;
                    $messageId = $checkMessageTrack->message_id;
                    $countAgentDepartment = DepartmentAgentMap::where('department_id', $departmentId)->count();
                    $responsesaveMessageForwardCount = $this->saveMessageForwardCount($widgetUuid, $countAgentDepartment, $messageId);
                    if ($responsesaveMessageForwardCount != false) {

                        $this->saveMessageAgentTrack($responsesaveMessageForwardCount, $chatRoomId, $widgetUuid, $messageId, $departmentId);
                    }
                } else {

                    return Response::json(array(
                        'status'   => false,
                        'code'     => 400,
                        'error'    => true,
                        'response' => [],
                        'message'  => 'Something went wrong !'
                    ));
                }

                return $chatRoomId;

            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Something went wrong !'
                ));
            }
        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Something went wrong !'
            ));
        }
    }

    /**
     * function to generate Random String for the chat_room_id
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    function generateRandomString()
    {
        $length           = 4;
        $characters       = '0123456789';
        $charactersLength = strlen($characters);
        $randomString     = '';

        for ($i = 0; $i < $length; $i++) {

            $randomString .= $characters[rand(0, $charactersLength - 1)];

        }

        return $randomString;
    }

    /**
     * function to save message forward count table
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveMessageForwardCount($widgetUuid,$countAgentDepartment,$messageId)
    {
        if( $widgetUuid !="" && $countAgentDepartment !="" && $messageId!="" ){

            $saveMessageForwardCount    =   new MessageForwardCounter;
            $saveMessageForwardCount->widget_id = $widgetUuid;
            $saveMessageForwardCount->agent_count = $countAgentDepartment;
            $saveMessageForwardCount->count_init = 1;
            $saveMessageForwardCount->message_id = $messageId;
            $saveMessageForwardCount->status = 1;
            if($saveMessageForwardCount->save()){
                return $saveMessageForwardCount->id;

            } else {
                return false;
            }
        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Something went wrong !'
            ));
        }

    }

    /**
     * function to save message agent track  table
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveMessageAgentTrack($responsesaveMessageForwardCount,$chatRoomId,$widgetUuid,$messageId,$departmentId)
    {
        if($responsesaveMessageForwardCount!="" && $chatRoomId!="" && $widgetUuid !="" && $messageId!="" &&$departmentId!=""){

            $getAllAgentId = DepartmentAgentMap::where('department_id',$departmentId)->select('user_id')->get();
            if( count($getAllAgentId) != 0 ){
                foreach ($getAllAgentId as $agentId){
                    $saveMessageAgentTrack = new MessageAgentTrack;
                    $saveMessageAgentTrack->agent_id = $agentId->user_id;
                    $saveMessageAgentTrack->message_id = $messageId;
                    $saveMessageAgentTrack->chat_room_id = $chatRoomId;
                    $saveMessageAgentTrack->widget_id = $widgetUuid;
                    $saveMessageAgentTrack->message_forward_counter_id = $responsesaveMessageForwardCount;
                    $saveMessageAgentTrack->status = 1;
                    if($saveMessageAgentTrack->save()){

                        $this->sendNotificationToAgents($saveMessageAgentTrack->agent_id,$saveMessageAgentTrack->widget_id);
                    } else {

                        return Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'error'    => true,
                            'response' => [],
                            'message'  => 'Something went wrong !'
                        ));
                    }

                }
            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Something went wrong !'
                ));
            }
        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Something went wrong !'
            ));
        }
    }

    /**
     * function to send notification to agents
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendNotificationToAgents($agentId,$widgetUuId)
    {
        if( $agentId !="" && $widgetUuId !="" ){
            $getAgent = Users::where('id',$agentId)->first();
            $getToNumber = Widgets::where('widget_uuid',$widgetUuId)->with('twilioNumbers')->first();
            $agentPhoneNumber = $getAgent->phone;
            $smsBody = "link to visit the page in the website http://3c.local/api/v1/chat-action (demo api url)";
            $this->sendSms($smsBody ,$agentPhoneNumber ,$getToNumber->twilioNumbers->number );

        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'Message not Send,Something went wrong !'
            ));
        }
    }

    /**
     * function to check agent chat action from the from
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function agentChatAction(Request $request){
        $agentId        = $request->agentId;
        $chatRoomId     = $request->chatRoomId;
        $status         = $request->status; //status According to the action    1->iniciated 2->Accept 3->Reject 4->Transfer
        $departmentId   = $request->departmentId;   // for transfer the the chat to a new department
        $toAgentId      = $request->toAgentId;  // for transfer the the chat to a new department

        $checkMessageAgentTrack = MessageAgentTrack::where('agent_id',$agentId)->where('chat_room_id',$chatRoomId)->first();

        if( count($checkMessageAgentTrack)!=0 ){
            if($status == 2){   // Accept status Scenario

                $responseAcceptChat = $this->acceptChat($checkMessageAgentTrack);
                return $responseAcceptChat;
            }if($status == 3){  // Reject status Scenario

                $responseRejectChat = $this->rejectChat($checkMessageAgentTrack);
                return $responseRejectChat;
            }if($status == 4){  // Transfer Status Scenario

                $responseTransferChat = $this->transferChat($checkMessageAgentTrack, $departmentId, $toAgentId, $fromAgentId);
                return $responseTransferChat;
            } else {

                return Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'error'    => true,
                    'response' => [],
                    'message'  => 'Sorry wrong status,Something went wrong !'
                ));
            }

        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => true,
                'response' => [],
                'message'  => 'No data found !'
            ));
        }
    }


    /**
     * function to accept chat from agent
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptChat($checkMessageAgentTrack)
    {
        $messageAgentTrackId    = $checkMessageAgentTrack->id;
        $agentId                = $checkMessageAgentTrack->agent_id;
        $widgetUuid             = $checkMessageAgentTrack->widget_id;
        $chatRoomId             = $checkMessageAgentTrack->chat_room_id;
        $messageId              = $checkMessageAgentTrack->message_id;
        $messageForwardCountId  = $checkMessageAgentTrack->message_forward_counter_id;
        $status                 = 2;    //accept Scenario

        $updateMessageAgentTrack = MessageAgentTrack::where('id',$messageAgentTrackId)->update(['status' => $status]);

        $deleteOtherAgents  = MessageAgentTrack::where('agent_id','!=',$agentId)->where('widget_id',$widgetUuid)->where('message_id',$messageId)->where('chat_room_id',$chatRoomId)->delete();

        $updateMessageTrack = MessageTrack::where('message_id',$messageId)->update(['agent_id'=>$agentId,'status'=>$status]);

        $updateMessageTrack = MessageLog::where('id',$messageId)->update(['user_id'=>$agentId,'status'=>$status]);

        //$updateChatThread   = ChatThread::where('message_log_id',$messageId)->where('widget_id',$widgetUuid)->update(['user_id' => $agentId,'status' => $status]);    //comment out

        $updateMessageForwardCounter = MessageForwardCounter::where('id',$messageForwardCountId)->update(['status'=>$status]);

        $response = ['agentId'=>$agentId,'chatRoomId'=>$chatRoomId,'status'=>$status];

        return  Response::json(array(
            'status'   => true,
            'code'     => 200,
            'error'    => true,
            'response' => $response,
            'message'  => 'Agent and chatroom !'
        ));
    }

    /**
     * function to reject chat from agent
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectChat($checkMessageAgentTrack)
    {
        $messageAgentTrackId    = $checkMessageAgentTrack->id;
        $agentId                = $checkMessageAgentTrack->agent_id;
        $widgetUuid             = $checkMessageAgentTrack->widget_id;
        $chatRoomId             = $checkMessageAgentTrack->chat_room_id;
        $messageId              = $checkMessageAgentTrack->message_id;
        $messageForwardCountId  = $checkMessageAgentTrack->message_forward_counter_id;
        $status                 = 3;    //reject Scenario

        $updateMessageAgentTrack = MessageAgentTrack::where('id',$messageAgentTrackId)->update(['status' => $status]);
        $countRejectedChat       = MessageAgentTrack::where('message_id',$messageId)->where('chat_room_id',$chatRoomId)->where('status',$status)->count();
        //$updateMessageTrack      = MessageTrack::where('message_id',$messageId)->update(['agent_id'=>$agentId,'status'=>$status]);
        $checkMessageForwardCounter = MessageForwardCounter::where('id',$messageForwardCountId)->first();

        if($checkMessageForwardCounter->agent_count == $countRejectedChat){

            $checkMessageForwardCounter->count_init = ($checkMessageForwardCounter->count_init +1);
            $checkMessageForwardCounter->update();
            $this->inicateRejectNotificationToAgents($checkMessageForwardCounter->id,$widgetUuid);
            $response = [ 'agentId' => $agentId, 'chatRoomId' => $chatRoomId, 'status'=>$status ];
            return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $response,
                'message'  => 'Agent and chatroom with Reject Status !'
            ));

        } else {

            $response = [ 'agentId' => $agentId, 'chatRoomId' => $chatRoomId, 'status'=>$status ];
            return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $response,
                'message'  => 'Agent and chatroom with Reject Status !'
            ));
        }
    }


    /**
     * function to inicate reject notification to all the agent in the department
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function inicateRejectNotificationToAgents($messageForwardCounterId,$widgetUuid)
    {
        if( $messageForwardCounterId !="" && $widgetUuid !="" ){

            $getAgents = MessageAgentTrack::where('message_forward_counter_id',$messageForwardCounterId)->get();
            if( count($getAgents) != 0 ){
                foreach($getAgents as $agent){
                    $this->sendNotificationToAgents($agent->agent_id,$widgetUuid);
                }
            } else {

                return  Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'response' => [],
                    'error'    => true,
                    'message'  => 'Something went wrong !'
                ));
            }
        }else{

            return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'error'    => true,
                'message'  => 'Something went wrong !'
            ));
        }

    }

    /**
     * function to transfer the chat
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */

    public function transferChat($checkMessageAgentTrack, $departmentId = null, $toAgentId=null )
    {
        $messageAgentTrackId    = $checkMessageAgentTrack->id;
        $fromAgentId            = $checkMessageAgentTrack->agent_id;
        $widgetUuid             = $checkMessageAgentTrack->widget_id;
        $chatRoomId             = $checkMessageAgentTrack->chat_room_id;
        $messageId              = $checkMessageAgentTrack->message_id;
        $status                 = 4;    //Transfer Scenario

        if( $departmentId != "" ){  //transfer to a department

            $checkDepartment = DepartmentAgentMap::where('id',$departmentId)->select('user_id')->get();
            if(count($checkDepartment) != 0){
                $dpartmentAgentCount = count($checkDepartment);
                $updateMessageTrack = MessageTrack::where('message_id',$messageId)->update(['department_id'=>$departmentId,'status'=>$status]);
                $updateMessageForwardCounter = MessageForwardCounter::where('widget_id',$widgetUuid)->where('message_id',$messageId)->update(['agent_count' => $dpartmentAgentCount,'status' => $status]);
                $deleteMessageAgentTrack = MessageAgentTrack::where('message_forward_counter_id',$updateMessageForwardCounter->id)->delete();
                foreach($checkDepartment as $agent){
                    $saveMessageAgentTrack = new MessageAgentTrack;
                    $saveMessageAgentTrack->agent_id = $agent->user_id;
                    $saveMessageAgentTrack->message_id = $messageId;
                    $saveMessageAgentTrack->chat_room_id = $chatRoomId;
                    $saveMessageAgentTrack->widget_id = $widgetUuid;
                    $saveMessageAgentTrack->message_forward_counter_id = $updateMessageForwardCounter->id;
                    $saveMessageAgentTrack->status = 1;
                    if($saveMessageAgentTrack->save()){

                        $this->sendNotificationToAgents($saveMessageAgentTrack->agent_id,$saveMessageAgentTrack->widget_id);
                    } else {

                        return  Response::json(array(
                            'status'   => false,
                            'code'     => 400,
                            'response' => [],
                            'error'    => true,
                            'message'  => 'Something went wrong !'
                        ));
                    }
                }
            }else{

                return  Response::json(array(
                    'status'   => false,
                    'code'     => 400,
                    'response' => [],
                    'error'    => true,
                    'message'  => 'Department Not Found !'
                ));
            }
        }elseif( $toAgentId != "" && $fromAgentId!="" ){

            $updateAgentFromMessageAgentTrack = MessageAgentTrack::where('agent_id',$fromAgentId)->where('chat_room_id',$chatRoomId)->where('widget_id',$widgetUuid)->update(['agent_id'=>$toAgentId]);
            $this->sendNotificationToAgents($toAgentId,$widgetUuid);
            $response = [ 'agentId' => $toAgentId, 'chatRoomId' => $chatRoomId, 'status'=>$status ];
            return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'response' => $response,
                'error'    => false,
                'message'  => 'Transfer to a new Agent!'
            ));
        }else{

            return  Response::json(array(
                'status'   => true,
                'code'     => 400,
                'response' => [],
                'error'    => false,
                'message'  => 'Sorry Department and Agent are not there !'
            ));
        }

    }

    /**
     * function for getting all the agent list with all the chatrooms and existing chats
     *
     * @param Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function agentWithChatRooms()
    {
        $agentsList = MessageAgentTrack::where('id','!=',"")->groupBy('agent_id')->get();
        $allAgents = [];
        foreach ($agentsList as $list) {
            $rooms = MessageAgentTrack::where('agent_id', $list->agent_id)->with('clientInfo.clientName','allChat.agentInfo')->get();
            $allRooms = [];
            $agents['agent_id'] = $list->agent_id;
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
        }

        return Response::json(array(
            'status'   => true,
            'error'    => false,
            'code'     => 200,
            'response' => $allAgents,
            'message'  => 'Agents with chatrooms !'
        ));
    }

}
