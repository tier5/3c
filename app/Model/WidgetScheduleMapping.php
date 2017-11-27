<?php
/**
* WidgetScheduleMapping model to manage CRUD operation for widget_schedule_mapping table.
*/
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class WidgetScheduleMapping extends Model
{
  /**
  * @var boolean
  */
  public $timestamps = false;

  /**
  * @var null|string
  */
  protected $table = 'widget_schedule_mapping';
}
