<?php
/**
* Department model to manage CRUD operation and relations of department table.
*/
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ChatUsers extends Model
{
	/**
	* @var boolean
	*/
	public $timestamps = true;

	/**
	* @var null|string
	*/
	protected $table = 'chat_users';

	
}