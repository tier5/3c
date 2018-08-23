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
    /**
     * @var array
     */
  protected $appends = ['name'];

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
      return $this->hasOne('App\Model\Users','id','parent_id')->select('id','company');
  }

  public function agentCount()
  {
      return $this->hasMany('App\Model\Users','parent_id','id');
  }

  public function departmentCount()
  {
      return $this->hasMany('App\Model\Department','user_id','id');
  }

    public function widgetCount()
    {
        return $this->hasMany('App\Model\Widgets','user_id','id');
    }

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }


    public function pendingChatCount()
    {
        return $this->hasMany('App\Model\MessageAgentTrack','agent_id','id')->where('status',1);
    }

    public function ongoingChatCount()
    {
        return $this->hasMany('App\Model\MessageAgentTrack','agent_id','id')->where('status',2);
    }

    public function closedChatCount()
    {
        return $this->hasMany('App\Model\MessageAgentTrack','agent_id','id')->where('status',5);
    }

    public function rejectedChatCount()
    {
        return $this->hasMany('App\Model\MessageAgentTrack','agent_id','id')->where('status',3);
    }

}
