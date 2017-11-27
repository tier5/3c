<?php
/**
* WidgetController to manage widgets with the users(Admin, Agents), various website, departments, scheduling and Twilio
* @param Request $request
*/
namespace App\Http\Controllers;

use App\Model\Timezone;
use Illuminate\Http\Request;
use App\Model\Widgets;
use App\Model\Users;
use App\Model\Department;
use App\Model\WidgetDepartmentMapping;
use App\Model\WidgetScheduleMapping;
use App\Http\Controllers\TwilioController;
use Helper;

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

      $imagePath        = '';
      $supportedFormat  = array('jpeg','jpg','png','gif','tif');
      $generateFileName = date("YmdHis");

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

      if($website!= "") {

        // Get User Id from token in case of userId is not provided
        if ($userId == '') {

          $userId = Helper::getUserIdFromToken($token);

        }

        $checkUser    = Users::where('id',$userId)->first();
        $checkWidgets = Widgets::where('website',$website)->first();

        // Check user is valid or not
        if (count($checkUser) == 0) {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>null,'status'=>false,'message'=>'Users not found !'));

        }

        // Check Widget for a website is already there or not
        if (count($checkWidgets) == 0) {

          // Save Widgets
          $widgets                    = new Widgets;
          $widgets->user_id           = $userId;
          $widgets->website           = $website;
          $widgets->area_code         = $areaCode;
          $widgets->schedule_timezone = $scheduleTimezone;
          $widgets->details           = $details;
          $widgets->status            = 0;

          if ($imagePath != '') {

            $widgets->image           = $imagePath;

          }

          if ($widgets->save()) {

            // Save Widget Schdule Time
            $req            = new Request;
            $req->widgetId  = $widgets->id;
            $req->daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $req->startTime = '00:00';
            $req->endTime   = '24:00';
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
            return $purchasedResponse;

          } else {

            return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets created failed !'));

          }

        } else {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Widgets exist !'));

        }
      } else {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Please provide some data !'));

      }
    }

    /**
    * Get List of widgets for websites
    *
    * @return \Illuminate\Http\JsonResponse
    */
    public function listWidgets()
    {
      $listsWidgets = Widgets::with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails')->get(); //Get Widgets with Twilio numbers

      if (count($listsWidgets) != 0) {

        return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$listsWidgets,'status'=>false,'message'=>'Lists of Widgets !'));

      } else {

        return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'No Widgets Found !'));

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
      $generateFileName       = date("YmdHis");
      $extension              = $request->image->extension();

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

          if (in_array($extension, $supportedFormat)) {

            // Delete previous image
            $deleteImage = substr($checkWidget->image, strpos($checkWidget->image,'widgets'));
            unlink($deleteImage);

            // Save new image
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

          return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$viewWidget,'status'=>false,'message'=>'Widgets updated successfully !'));

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
      $widgetDepartment = $request->departmentIdArray;
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

        $checkDepartment = Department::where('id',$checkValue)->where('user_id',$widgetUserId)->first();

        if (count($checkDepartment) == 0) {

          return $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'Department not found !'));

        }
      }

      // Delete departments of Widget
      $deleteDepartments = WidgetDepartmentMapping::where('widget_id',$widgetId)->delete();

      // Save Departments of Widget
      foreach ($widgetDepartment as $key => $value) {

        $departmentMapping                = new WidgetDepartmentMapping;
        $departmentMapping->widget_id     = $widgetId;
        $departmentMapping->department_id = $value;
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
      $days                      = implode(',',$widgetScheduleDay);

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

        $viewWidget = Widgets::where('id',$widgetId)->with('twilioNumbers','widgetSchedule','widgetDepartment.departmentDetails')->first();
        return $response = json_encode(array('code'=>200,'error'=>false,'response'=>$viewWidget,'status'=>false,'message'=>'Widget Details !'));

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
            $response = json_encode(array('code'=>200,'error'=>false,'response'=>$timezones,'status'=>true,'message'=>'All Timezones !'));

        } else {
            $response = json_encode(array('code'=>400,'error'=>true,'response'=>[],'status'=>false,'message'=>'No Timezone found !'));

        }

        return $response;
    }

}
