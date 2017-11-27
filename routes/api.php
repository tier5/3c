<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Application User Routes
Route::post('userlogin','UserController@userLogin');
Route::post('userprofile','UserController@getUserProfile');
//Forget Password API
Route::post('forget-password-mail','UserController@checkForgetPasswordEmail');
Route::post('update-password','UserController@updateForgetPassword');
Route::get('update/password/{id}','UserController@getUserinfoWithForgetPasswordLink');
//update user info API
Route::post('updateuserprofile','UserController@updateUserProfile');
//Twilio Route
Route::post('twilio-information','TwilioController@storeTwilioInformation');
Route::post('get-twilio-information','TwilioController@getTwilioInformation');
//Admin Registration
Route::post('admin-registration','UserController@adminRegistration');
//Admin List
Route::get('admin-list','UserController@adminList');
//Emulate User
Route::post('emulate-user','UserController@emulateUser');
//Block User
Route::post('block-user','UserController@blockUser');
//Unblock user
Route::post('unblock-user','UserController@unblockUser');

//User logOut
Route::any('log-out','UserController@logOut');
//create Department
Route::post('create-department','DepartmentController@createDepartment');
//edit Department
Route::post('edit-department','DepartmentController@editDepartment');
//view Department
Route::post('view-department','DepartmentController@viewDepartment');
//Depaerment List
Route::post('department-list','DepartmentController@departmentList');
// Agent register
Route::post('agent-register','UserController@agentRegister');
// Agent List of an Admin or SuperAdmin
Route::post('listofAgent','UserController@listofAgent');
// Edit Agent
Route::post('agent-update','UserController@updateAgent');
// Block Unblock Agent
Route::post('agent-status-update','UserController@agentStatusUpdate');
// validate Twilio Credentials
Route::get('validate-twilio-credentials','TwilioController@validateTwilioCredentials');
// Twilio Account List
Route::get('twilio-account-list','TwilioController@twilioAccountList');
// Get available phone numbers from Twilio
Route::get('getPurchasedPhoneNumber/{widgetId}/{userId}/{areaCode}', 'TwilioController@getPurchasedPhoneNumber');
// create Widgets
Route::post('createWidgets', 'WidgetController@createWidgets');
// Get list of Widgets
Route::get('listWidgets', 'WidgetController@listWidgets');

//Create Twilio SID for Admin User
Route::post('create-user-twilio-sid','UserController@createUserTwilioSid');

// Update Widgets
Route::post('updateWidgets', 'WidgetController@updateWidgets');
// Widget Department Mapping
Route::post('updateWidgetDepartment', 'WidgetController@updateWidgetDepartment');
// Widget Schedule Mapping
Route::post('updateWidgetSchedule', 'WidgetController@updateWidgetSchedule');
// View Widget
Route::post('viewWidgets', 'WidgetController@viewWidgets');
//Timezone API
Route::get('get-timezone', 'WidgetController@getTimezones');
