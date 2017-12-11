<?php

namespace App\Http\Controllers;

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
use App\Http\Controllers\TwilioController;
use Helper;
use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use Illuminate\Database\QueryException;

class ChatController extends Controller
{
    public function checkMessage(Request $request)
    {
        //Variable Declaration
        $fromNumber     = $request->fromNumber;
        $toNumber       = $request->toNumber;
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

                //do Something
            }
    }

    public function checkMessageCache($fromNumber,$widgetUuid,$messageBody)
    {
        if($fromNumber != "" && $widgetUuid !=""){

            $checkMessageCache = MessageCache::where('from_phone_number',$fromNumber)->where('widget_uuid',$widgetUuid)->first();
            if(count($checkMessageCache) != 0 ){

                if($checkMessageCache->status == 1){

                    $this->checkMessageContain($messageBody,$fromNumber,$widgetUuid,$checkMessageCache->id);
                    //do Something
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
                        //do something
                    }

                }else{
                    //do something
                }


            }
        }else{
            //do something
        }

    }
    //block 3
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

                            }

                        }
                     }else{
                         //do something
                     }

                }else{
                    //do something
                }

            } else {

                $checkMessageCache = MessageCache::where('from_phone_number',$fromNumber)->where('widget_uuid',$widgetUuid)->where('status',1)->first();
                $responseMessageCacheData = $this->saveMessageCacheData($messageBody, $checkMessageCache->id );

                if($responseMessageCacheData == true ){

                    $this->createSmsTemplate($fromNumber, $widgetUuid);
                }else{
                    //do something
                }
            }
        }
    }

    function ctype_int($text)
    {
        return preg_match('/^-?[0-9]+$/', (string)$text) ? true : false;
    }

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
                $smsBody.="Reply with the Number only";
                print_r($smsBody); // Template
                $this->sendSms( $smsBody, $fromNumber, $getWidgetData->twilioNumbers->number);
            }else{

               //do something
            }
        }else{

            //do something
        }
    }

    public function sendSms($smsBody, $fromNumber, $toNumber)
    {
        // send SMS with the details
    }

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

        }
    }

    public function saveMessageCacheData($messageBody, $responseMessageCacheId){
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
        }
    }

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

        }
    }

    public function saveContactList($widgetUuid,$fromNumber){
        if($widgetUuid!="" && $fromNumber!=""){
            $checkContactList = ContactList::where('widget_id',$widgetUuid)->where('phone',$fromNumber)->first();
            if( count($checkContactList) == 0 ){
                $saveContactList = new ContactList;
                $saveContactList->phone = $fromNumber;
                $saveContactList->widget_id = $widgetUuid;
                $saveContactList->save();
                return $saveContactList->id;
            }else{
                return $checkContactList->id;
            }

        }else{
            //do something
        }
    }

    public function saveMessageLog($saveContactListId,$widgetUuid){
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
            //do something
        }
    }

    public function saveChatThread( $responseSaveContactList,$widgetUuid,$messageBody,$type,$direction,$userId){
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
                return true;
            }else{
                return false;
            }
        }
    }

    public function saveOtherChat( $fromNumber, $widget_uuid, $messageBody, $type, $direction)
    {
        if($fromNumber !="" && $widget_uuid!="" && $messageBody !=""){
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
                //do something
            }
        }else{
            //do Something
        }
    }

}
