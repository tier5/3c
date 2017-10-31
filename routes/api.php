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
