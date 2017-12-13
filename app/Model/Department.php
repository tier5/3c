<?php
/**
* Department model to manage CRUD operation and relations of department table.
*/
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
	/**
	* @var boolean
	*/
	public $timestamps = true;

	/**
	* @var null|string
	*/
	protected $table = 'department';

	/**
    * one to one relationship with users table
    */
  	public function userDetails() {

    return $this->hasOne('App\Model\Users','id','user_id');

	}
}
