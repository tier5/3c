<?php
/**
* Users model to manage CRUD operation and relations of users table.
*/
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
  /**
  * @var boolean
  */
  public $timestamps = true;

  /**
  * @var null|string
  */
  protected $table = 'users';

  /*
  function for getting twilio credentials
  */
  public function twilioInfo(){
    return $this->hasOne('App\Model\TwilioCredentials','user_id','id');
  }

  /*
  function for getting department agent mapping details
  */
  public function departmentAgentMapping()
  {
    return $this->hasOne('App\Model\DepartmentAgentMap','user_id','id');
  }

  public function getCompany()
  {
      return $this->hasOne('App\Model\Users','id','parent_id');
  }
}
