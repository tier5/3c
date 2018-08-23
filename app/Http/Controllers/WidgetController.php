<?php
/**
* WidgetController to manage widgets with the users(Admin, Agents), various website, departments, scheduling and Twilio
* @param Request $request
*/
namespace App\Http\Controllers;

use App\Model\Timezone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Response;
use App\Model\Widgets;
use App\Model\Users;
use App\Model\UserToken;
use App\Model\Department;
use App\Model\WidgetDepartmentMapping;
use App\Model\WidgetScheduleMapping;
use App\Http\Controllers\TwilioController;
use Helper;
use App\Exceptions\EntityConflictException;
use App\Exceptions\HttpBadRequestException;
use Illuminate\Database\QueryException;
use DB;

class WidgetController extends Controller
{
    /**
    * Create widgets for a website
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function createWidgets(Request $request)
    {
      $userId           = $request->userId;
      $website          = $request->website;
      $scheduleTimezone = $request->scheduleTimezone;
      $details          = $request->details;
      $token            = $request->token;
      $areaCode         = $request->areaCode;
      $widgetDepartment = $request->departmentIdArray;
      $widgetLogo       = $request->image;

      $dayArray         = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      $daysArray        = $request->daysArray == '' ? $dayArray : $request->daysArray;
      $startTime        = $request->startTime == '' ? '00:00:00' : $request->startTime;
      $endTime          = $request->endTime == '' ? '24:00:00' : $request->endTime;
      $imagePath        = '';
      $supportedFormat  = array('jpeg','jpg','png','gif','tif');
      $generateFileName = date("YmdHis");
      $widgetUuid = app(\App\Http\Controllers\UserController::class)
            ->generateRandomString();   //creating widget uuid
      $widgetSrciptUrl ="<script src='".url('/').'/widgets/script/widget.min.js'."' id='tib-widget' data-uuid='".$widgetUuid."'></script>";

        // Check file is in param
      if ($request->hasFile('image')) {

        $extension         = $request->image->extension();

        if (in_array($extension, $supportedFormat)) {
          // Save new image
          $imageName = $generateFileName.'.'.$extension;
          $request->image->move(public_path('/widgets'), $imageName);
          $imagePath = asset('widgets/'.$imageName);

        } else {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'File format not supported !'));

        }
      }

      // if($userId) {

        // Get User Id from token in case of userId is not provided
        if ($userId == '' || $userId=="undefined") {

          $userId = Helper::getUserIdFromToken($token);
           

        }

        $checkUser    = Users::where('id',$userId)->first();
        //  $checkWidgets = Widgets::where('website',$website)->first();


        // Check user is valid or not
        if (count($checkUser) == 0) {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>$token,'status'=>false,'message'=>'Users not found !'));

        }

        // Check Widget for a website is already there or not
        //  if (count($checkWidgets) == 0) {

          // Save Widgets
          $widgets                    = new Widgets;
          $widgets->user_id           = $userId;
          $widgets->website           = $website;
          $widgets->area_code         = $areaCode;
          $widgets->schedule_timezone = $scheduleTimezone;
          $widgets->details           = $details;
          $widgets->widget_uuid       = $widgetUuid;
          $widgets->script_url     = $widgetSrciptUrl;
          $widgets->status            = 0;

          if ($imagePath != '') {

            $widgets->image           = $imagePath;

          }

          if ($widgets->save()) {

            // Save Widget Schdule Time
            $req            = new Request;
            $req->widgetId  = $widgets->id;
            $req->daysArray = $daysArray;
            $req->startTime = $startTime;
            $req->endTime   = $endTime;
            $this->updateWidgetSchedule($req);
            // Save Widget Departments
            $reqDepartments                    = new Request;
            $reqDepartments->widgetId          = $widgets->id;
            $reqDepartments->userId            = $userId;
            $reqDepartments->departmentIdArray = $widgetDepartment;

                 
            $this->updateWidgetDepartment($reqDepartments);


            // Get purchased twilio purchased phone numbers
            $twilioController  = new TwilioController;
            $purchasedResponse = $twilioController->getPurchasedPhoneNumber($widgets->id, $userId, $areaCode);

            return $response = json_encode(array(
                        'code'      =>  200,
                        'error'     =>  false,
                        'response'  =>  $widgetSrciptUrl,
                        'status'    =>  true,
                        'message'   =>  'Widgets created Successfully !'));
          } else {

            return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets created failed !'));

          }

        //  }
//        else {
//
//          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets exist !'));
//
//        }
      // }
    }

    /**
    * Get List of widgets for websites
    *
    * @return \Illuminate\Http\JsonResponse
    */
    public function listWidgets(Request $request)
    {

      $userToken = $request->token; //user Token
      $userId    = $request->userId; //user ID
      if( $userToken != "" ) {
        $checkUser  = UserToken::where('token',$userToken)->with('userInfo')->first();

        if( count($checkUser) != 0 ) {

          if( $checkUser->userInfo->type == 1 && $userId == "" ) { //Superadmin Widget List

              $allListsWidgetsData = Widgets::with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails','userDetails')->orderBy('created_at','desc')->get(); //Get Widgets with Twilio numbers

            if(count($allListsWidgetsData) != 0){
                $listsWidgets = [];
                foreach($allListsWidgetsData as $key=>$data){
                    $listsWidgets[$key]['id'] = $data->id;
                    $listsWidgets[$key]['created_at'] = $data->created_at->format('Y-m-d H:i:s');
                    $listsWidgets[$key]['first_name'] = $data->userDetails->first_name;
                    $listsWidgets[$key]['last_name'] = $data->userDetails->last_name;
                    $listsWidgets[$key]['company'] = $data->userDetails->company;
                    if($data->widgetDepartment != null){
                        $departmentNames = array();
                        foreach($data->widgetDepartment as $newKey=>$depData){
                             $departmentNames[$newKey] = $depData->departmentDetails->department_name;
                        }
                    }
                    $listsWidgets[$key]['widget_department'] = $departmentNames;
                    if($data->twilioNumbers != null){
                        $listsWidgets[$key]['twilio_numbers'] = $data->twilioNumbers->number;
                    }else{
                        $listsWidgets[$key]['twilio_numbers'] = '';
                    }
                }

              return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'response' => $listsWidgets,
                'message'  => 'Widget List!'
              ));

            } else {

              return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'message'  => 'Sorry Widget not found !'
              ));

            }
          }

          if( $checkUser->userInfo->type == 1 && $userId != "" ) { //Superadmin Widgets List

              $allListsWidgetsData = Widgets::where('user_id',$userId)
                                   ->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails','userDetails')->orderBy('created_at','desc')
                                   ->get(); //Get Widgets with Twilio numbers

            if(count($allListsWidgetsData) != 0){
                $listsWidgets = [];
                foreach($allListsWidgetsData as $key=>$data){
                    $listsWidgets[$key]['id'] = $data->id;
                    $listsWidgets[$key]['created_at'] = $data->created_at->format('Y-m-d H:i:s');
                    $listsWidgets[$key]['first_name'] = $data->userDetails->first_name;
                    $listsWidgets[$key]['last_name'] = $data->userDetails->last_name;
                    $listsWidgets[$key]['company'] = $data->userDetails->company;
                    if($data->widgetDepartment != null){
                        $departmentNames = array();
                        foreach($data->widgetDepartment as $newKey=>$depData){
                            $departmentNames[$newKey] = $depData->departmentDetails->department_name;
                        }
                    }
                    $listsWidgets[$key]['widget_department'] = $departmentNames;
                    if($data->twilioNumbers != null){
                        $listsWidgets[$key]['twilio_numbers'] = $data->twilioNumbers->number;
                    }else{
                        $listsWidgets[$key]['twilio_numbers'] = '';
                    }
                }
              return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'response' => $listsWidgets,
                'message'  => 'Widget List!'
              ));

            } else {

              return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'message'  => 'Sorry Widget not found !'
              ));

            }
          }

          if( $checkUser->userInfo->type == 2 ) { //Admin Department List

              $allListsWidgetsData = Widgets::where('user_id',$checkUser->userInfo->id)
                                   ->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails','userDetails')->orderBy('created_at','desc')
                                   ->get(); //Get Widgets with Twilio numbers


            if( count($allListsWidgetsData) != 0 ) {
                $listsWidgets = [];
                foreach($allListsWidgetsData as $key=>$data){
                    $listsWidgets[$key]['id'] = $data->id;
                    $listsWidgets[$key]['created_at'] = $data->created_at->format('Y-m-d H:i:s');
                    $listsWidgets[$key]['first_name'] = $data->userDetails->first_name;
                    $listsWidgets[$key]['last_name'] = $data->userDetails->last_name;
                    $listsWidgets[$key]['company'] = $data->userDetails->company;
                    if($data->widgetDepartment != null){
                        $departmentNames = array();
                        foreach($data->widgetDepartment as $newKey=>$depData){
                            $departmentNames[$newKey] = $depData->departmentDetails->department_name;
                        }
                    }
                    $listsWidgets[$key]['widget_department'] = $departmentNames;
                    if($data->twilioNumbers != null){
                        $listsWidgets[$key]['twilio_numbers'] = $data->twilioNumbers->number;
                    }else{
                        $listsWidgets[$key]['twilio_numbers'] = '';
                    }
                }
              return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'response' => $listsWidgets,
                'message'  => 'Widgets List!'
              ));

            } else {

              return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'message'  => 'Sorry Widget not found !'
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
          //fetching the list of widgets for a specific user/admin
          $allListsWidgetsData = Widgets::where('user_id',$userId)
                                 ->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails','userDetails')
                                 ->get(); //Get Widgets with Twilio numbers

          if( count($allListsWidgetsData) != 0 ) {
              $listsWidgets = [];
              foreach($allListsWidgetsData as $key=>$data){
                  $listsWidgets[$key]['id'] = $data->id;
                  $listsWidgets[$key]['created_at'] = $data->created_at->format('Y-m-d H:i:s');
                  $listsWidgets[$key]['first_name'] = $data->userDetails->first_name;
                  $listsWidgets[$key]['last_name'] = $data->userDetails->last_name;
                  $listsWidgets[$key]['company'] = $data->userDetails->company;
                  if($data->widgetDepartment != null){
                      $departmentNames = array();
                      foreach($data->widgetDepartment as $newKey=>$depData){
                          $departmentNames[$newKey] = $depData->departmentDetails->department_name;
                      }
                  }
                  $listsWidgets[$key]['widget_department'] = $departmentNames;
                  if($data->twilioNumbers != null){
                      $listsWidgets[$key]['twilio_numbers'] = $data->twilioNumbers->number;
                  }else{
                      $listsWidgets[$key]['twilio_numbers'] = '';
                  }
              }
            return  Response::json(array(
                'status'   => true,
                'code'     => 200,
                'response' => $listsWidgets,
                'message'  => 'Widgets List!'
            ));

          } else {

            return  Response::json(array(
                'status'   => false,
                'code'     => 400,
                'response' => [],
                'message'  => 'Sorry Widget not found !'
            ));

          }
      } else {

        return  Response::json(array(
          'status'  => false,
          'code'    => 400,
          'response' => [],
          'message' => 'sorry no widget data found !'
        ));

      }
    }

    /**
    * Edit changes of widgets for websites
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function updateWidgets(Request $request)
    {
      $widgetId               = $request->id;
      $widgetWebsite          = $request->website;
      $widgetScheduleTimeZone = $request->scheduleTimezone;
      $widgetDetails          = $request->details;
      $widgetScheduleDay      = $request->daysArray;
      $widgetStartTime        = $request->startTime;
      $widgetEndTime          = $request->endTime;
      $widgetDepartment       = $request->departmentIdArray;
      $widgetLogo             = $request->image;
      $userId                 = $request->userId;
      $token                  = $request->token;

      $imagePath              = '';
      $supportedFormat        = array('jpeg','jpg','png','gif','tif');
      $generateFileName       = date("YmdHi");

      // If userId is not present
      if ($userId == '') {

        $userId = Helper::getUserIdFromToken($token);

      }

      $checkUser   = Users::where('id',$userId)->first();
      $checkWidget = Widgets::find($widgetId);

      // Check user is valid or not
      if (count($checkUser) == 0) {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Users not found !'));

      }

      // Check widget is in record
      if (count($checkWidget) == 1) {
        // Check file is in param
        if ($request->hasFile('image')) {
          $extension = $request->image->extension();
          if (in_array($extension, $supportedFormat)) {
            $imageName   = $generateFileName.'.'.$extension;
            $request->image->move(public_path('/widgets'), $imageName);
            $imagePath   = asset('widgets/'.$imageName);

          } else {

            return $response = json_encode(array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'File format not supported !'));

          }

        }

        // Update Widget
        $checkWidget->website           = $widgetWebsite;
        $checkWidget->schedule_timezone = $widgetScheduleTimeZone;
        $checkWidget->details           = $widgetDetails;

        if ($imagePath != '') {
          $checkWidget->image           = $imagePath;
        } else {

          if ($checkWidget->image != "") {
               // $deleteImage = substr($checkWidget->image, strpos($checkWidget->image, 'widgets'));
               // unlink($deleteImage);
              $checkWidget->image = $checkWidget->image;
          }
        }
        if ($checkWidget->save()) {

          // Save Widget Schdule Time
          $reqSchedule            = new Request;
          $reqSchedule->widgetId  = $widgetId;
          $reqSchedule->daysArray = $widgetScheduleDay;
          $reqSchedule->startTime = $widgetStartTime;
          $reqSchedule->endTime   = $widgetEndTime;
          $this->updateWidgetSchedule($reqSchedule);
          // Save Widget Departments
          $reqDepartments                    = new Request;
          $reqDepartments->widgetId          = $widgetId;
          $reqDepartments->userId            = $userId;
          $reqDepartments->departmentIdArray = $widgetDepartment;
          $this->updateWidgetDepartment($reqDepartments);

          // Get Widget Details
          $viewWidget = Widgets::where('id',$widgetId)->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails')->first();

          return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$viewWidget,'status'=>true,'message'=>'Widgets updated successfully !'));

        } else {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets updated failed !'));

        }

      } else {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets not found !'));

      }

    }

    /**
    * Save Department for widgets
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function updateWidgetDepartment(Request $request)
    {
      $widgetId         = $request->widgetId;
      $widgetUserId     = $request->userId;
      $widgetDepartment = explode(',', $request->departmentIdArray);
      $token            = $request->token;

      $checkWidget      = Widgets::find($widgetId);

      // Check Widget
      if (count($checkWidget) != 1) {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widget not found !'));

      }

      // Get User from token
      if ($widgetUserId == '') {

        $widgetUserId = Helper::getUserIdFromToken($token);

      }

      $checkUser = Users::find($widgetUserId);

      // Check User
      if (count($checkUser) != 1) {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'User not found !'));

      }

      // Check Departments of Admin
      foreach ($widgetDepartment as $checkKey => $checkValue) {

        if($checkUser->type == 1) {
          $checkDepartment = Department::where('id',$checkValue)->first();

        } else {
          $checkDepartment = Department::where('id',$checkValue)->where('user_id',$widgetUserId)->first();
        }

        if (count($checkDepartment) == 0) {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Department not found !'));

        }
      }

      // Delete departments of Widget
      $deleteDepartments = WidgetDepartmentMapping::where('widget_id',$widgetId)->delete();

      // Save Departments of Widget
      foreach ($widgetDepartment as $key => $value) {

        $departmentMapping                      = new WidgetDepartmentMapping;
        $departmentMapping->widget_id           = $widgetId;
        $departmentMapping->department_id       = $value;
        $departmentMapping->department_orders   = $key;
        $departmentMapping->save();

      }

      return $response = json_encode(array('code'=>200,'error'=>true,'response'=>[],'status'=>false,'message'=>'Department mapped to Widget !'));

    }

    /**
    * Save Schedule Time for widgets
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function updateWidgetSchedule(Request $request)
    {
      $widgetId                  = $request->widgetId;
      $widgetScheduleDay         = $request->daysArray;
      $widgetStartTime           = $request->startTime;
      $widgetEndTime             = $request->endTime;
      $days                      = $request->daysArray;

      $checkWidget               = Widgets::find($widgetId);

      // Check Widget
      if (count($checkWidget) != 1) {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widget not found !'));

      }
      
      $checkWidgetSchedule = WidgetScheduleMapping::where('widget_id', $widgetId)->first();

      if (count($checkWidgetSchedule) == 0) {

        $widgetSchedule             = new WidgetScheduleMapping;
        $widgetSchedule->widget_id  = $widgetId;
        $widgetSchedule->day        = $days;
        $widgetSchedule->start_time = $widgetStartTime;
        $widgetSchedule->end_time   = $widgetEndTime;

        if ($widgetSchedule->save()) {

          return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$widgetSchedule,'status'=>false,'message'=>'Widget Schedule saved !'));

        } else {

          return $response = json_encode(array('code'=>400,'error'=>false,'response'=>[],'status'=>false,'message'=>'Widget Schedule not saved !'));

        }

      } else {

        $checkWidgetSchedule->day        = $days;
        $checkWidgetSchedule->start_time = $widgetStartTime;
        $checkWidgetSchedule->end_time   = $widgetEndTime;

        if ($checkWidgetSchedule->save()) {

          return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$checkWidgetSchedule,'status'=>false,'message'=>'Widget Schedule saved !'));

        } else {

          return $response = json_encode(array('code'=>400,'error'=>false,'response'=>[],'status'=>false,'message'=>'Widget Schedule not saved !'));

        }
      }
    }

    /**
    * View widget
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
    public function viewWidgets(Request $request)
    {
      $widgetId    = $request->widgetId;
      $checkWidget = Widgets::find($widgetId);

      // Check Widget
      if (count($checkWidget) != 1) {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widget not found !'));

      } else {

        $viewWidget = Widgets::where('id',$widgetId)->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails','userDetails')->first();
        
        /** to get all the widget departments */
        $departmentArray = [];

        foreach($viewWidget->widgetDepartment as $key => $department) {
          $departmentArray[$key]['id'] = $department->department_id;
          $departmentArray[$key]['department_name'] = $department->departmentDetails->department_name;
        }

        /** array to send the response */
        $widgetArray = [];

        $widgetArray['id']                 = $viewWidget->id;
        $widgetArray['details']            = $viewWidget->details;
        $widgetArray['area_code']          = $viewWidget->area_code;
        $widgetArray['image']              = $viewWidget->image;
        $widgetArray['schedule_timezone']  = $viewWidget->schedule_timezone;
        $widgetArray['status']             = $viewWidget->status;
        $widgetArray['user_id']            = $viewWidget->user_id;
        $widgetArray['website']            = $viewWidget->website;
        $widgetArray['widget_uuid']        = $viewWidget->widget_uuid;
        $widgetArray['widget_department']  = $viewWidget->widgetDepartment;
        $widgetArray['twilio_numbers']     = $viewWidget->twilioNumbers;
        $widgetArray['widget_schedule']    = $viewWidget->widgetSchedule;
        $widgetArray['script_url']         = $viewWidget->script_url;
        $widgetArray['departments']        = $departmentArray;
        $widgetArray['first_name']         = $viewWidget->userDetails->first_name;
        $widgetArray['last_name']          = $viewWidget->userDetails->last_name;


        return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$widgetArray,'status'=>true,'message'=>'Widget Details !'));

      }

    }

    /**
     * Get Timezones from timezone table
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTimezones()
    {
        $timezones = Timezone::get();
        if(count($timezones)!=0) {

            return Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $timezones,
                'message'  => 'All Timezones !'
            ));

        } else {

            return Response::json(array(
                'status'   => false,
                'code'     => 400,
                'error'    => false,
                'response' => [],
                'message'  => 'No Timezones Found !'
            ));

        }
    }

    /**
     * Get widget respect to widget uuid
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
  public function getWidgetData(Request $request)
  {
    try {

      DB::beginTransaction();

      $widgetUuid = $request->widgetUuid;
      if( $widgetUuid != "" ){

        $widgetData = Widgets::where('widget_uuid',$widgetUuid)->with('userDetails','twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails')->get();

        if(count($widgetData) != 0){

          $widgetArray = [];
          $widgetData = $widgetData->first();
          $timezone_data = Timezone::where('id',$widgetData->schedule_timezone)->first();
          $days= [];
          $weekdays = [
            'Mon' => 1,
            'Tue' => 2 ,
            'Wed' => 3,
            'Thu' => 4,
            'Fri' => 5,
            'Sat' => 6,
            'Sun' => 0
          ];
          $dates = [];
          $date = date('w');
          $day  = date('w');
          $start_date =  date('Y-m-d', strtotime('-'.$day.' days'));
          $daysArray = explode(',', $widgetData->widgetSchedule->day);
          for($i=0; $i< count($daysArray) ; $i++) {
            if(array_key_exists( $daysArray[$i], $weekdays) )
            {
              if($daysArray[$i]=="Sun") {
                $dates[]=  date('Y-m-d', strtotime('next sunday'));
              } else if($daysArray[$i]=="Mon") {
                $dates[]=  date('Y-m-d', strtotime('next monday'));
              } else if($daysArray[$i]=="Tue") {
                $dates[]=  date('Y-m-d', strtotime('next tuesday'));
              } else if($daysArray[$i]=="Wed") {
                $dates[]=  date('Y-m-d', strtotime('next wednesday'));
              } else if($daysArray[$i]=="Thu") {
                $dates[]=  date('Y-m-d', strtotime('next thursday'));
              } else if($daysArray[$i]=="Fri") {
                $dates[]=  date('Y-m-d', strtotime('next friday'));
              } else {
                $dates[]=  date('Y-m-d', strtotime('next saturday'));
              } 
              $days[$weekdays[$daysArray[$i]]] =$daysArray[$i];
                  
            }
          }
          $timezone['time_difference']    = $timezone_data->time_difference;
          $timezone['status']             = $timezone_data->status;
          $timezone['timezone_name']      = $timezone_data->timezone_name;
          $timezone['days']               = $days;
          $timezone['id']                 = $timezone_data->id;

          
          return Response::json(array(
            'status'   => true,
            'code'     => 200,
            'error'    => false,
            'widget'   => $widgetData,
            'timezone' => $timezone,
            'dates'     => $dates,
            'message'  => 'Widget Data !'
          ));

        } else {

          return Response::json(array(
            'status'   => false,
            'code'     => 400,
            'error'    => false,
            'widget' => [],
            'message'  => 'Sorry No Widget Data Found !'
          ));
        }
      } else {

        return Response::json(array(
          'status'   => false,
          'code'     => 400,
          'error'    => false,
          'widget' => [],
          'message'  => 'Sorry Invalid Widget ID !'
        ));
      }
    } catch (Exception $exception) {
      DB::rollBack();
      return Response::json(array(
        'status'        => false,
        'error'         => "Internal server error.",
        'error_info'    => $exception->getMessage()
      ));
    } finally {
        DB::commit();
    }
  }

  /**
  * Get widget departments according to widget uuid
  *
  * @param Request $request
  * @return \Illuminate\Http\JsonResponse
  */
  public function getWidgetDepartments(Request $request)
  {
    try {

      DB::beginTransaction();

      $widget = $request->widget_data;
      $widgetUuid = $widget['widgetUuid'];
      if( $widgetUuid != "" ){

        $widgetData = Widgets::where('widget_uuid',$widgetUuid)->with('userDetails','twilioNumbers','widgetDepartment.departmentDetails')->get();

        if(count($widgetData) != 0){

          $widgetArray = [];
          $widgetData = $widgetData->first();
          

          $departmentArray = [];
          $deptArray = $widgetData->widgetDepartment;
          if(count($deptArray)>0) {
            foreach ($deptArray as $dept) {
              $departments = [];
              $departments['id']              = $dept->department_id;
              $departments['department_name'] = $dept->departmentDetails->department_name;
              $departments['department_details'] = $dept->departmentDetails->department_details;
              $departments['status'] = $dept->departmentDetails->status;
              $departments['user_id'] = $dept->departmentDetails->user_id;
              $departmentArray[] = $departments;
            }
          }

          return Response::json(array(
            'status'   => true,
            'code'     => 200,
            'error'    => false,
            'widget'   => $widgetData,
            'departments' => $departmentArray,
            'message'  => 'Widget Data !'
          ));

        } else {

          return Response::json(array(
            'status'   => false,
            'code'     => 400,
            'error'    => false,
            'widget' => [],
            'message'  => 'Sorry No Widget Data Found !'
          ));
        }
      } else {

        return Response::json(array(
          'status'   => false,
          'code'     => 400,
          'error'    => false,
          'widget' => [],
          'message'  => 'Sorry Invalid Widget ID !'
        ));
      }
    } catch (Exception $exception) {
      DB::rollBack();
      return Response::json(array(
        'status'        => false,
        'error'         => "Internal server error.",
        'error_info'    => $exception->getMessage()
      ));
    } finally {
        DB::commit();
    }
  }

}
