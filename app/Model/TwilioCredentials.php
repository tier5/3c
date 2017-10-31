<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class TwilioCredentials extends Model
{
  public $timestamps = true;
  protected $table = 'twilio_credential';
}
