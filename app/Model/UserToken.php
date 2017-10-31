<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
  public $timestamps = true;
  protected $table = 'user_tokens';

  public function userInfo(){
    return $this->hasOne('App\Model\Users','id','profile_user_id');
  }
}
