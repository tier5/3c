<?php
/**
* UserToken model to manage CRUD operation and relations of user_tokens table.
*/
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
  /**
  * @var boolean
  */
  public $timestamps = true;

  /**
  * @var null|string
  */
  protected $table = 'user_tokens';

  /**
   * One-to-One relationship with users table
   */
  public function userInfo(){
    return $this->hasOne('App\Model\Users','id','profile_user_id');
  }
}
