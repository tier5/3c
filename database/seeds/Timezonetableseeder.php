<?php

use Illuminate\Database\Seeder;

class Timezonetableseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('timezone')->insert([[
            'timezone_name' =>'(GMT-10:00) Hawaii',
            'time_difference'=>'10:00:00',
            'action' => '0',
            'status' => '0',
        ],
            ['timezone_name' =>'(GMT-9:00) AKST - Alaska Standard Time',
            'time_difference'=>'09:00:00',
            'action' => '0',
            'status' => '0',
        ],  ['timezone_name' =>'(GMT-8:00) PST - Pacific Standard Time',
                'time_difference'=>'07:00:00',
                'action' => '0',
                'status' => '0',
        ],
            ['timezone_name' =>'(GMT-7:00) MST - Mountain Standard Time',
                'time_difference'=>'06:00:00',
                'action' => '0',
                'status' => '0',
        ],  ['timezone_name' =>'(GMT-6:00) CST - Central Standard Time',
                'time_difference'=>'05:00:00',
                'action' => '0',
                'status' => '0',
        ],  ['timezone_name' =>'(GMT-4:00) EST - Eastern Standard Time',
                'time_difference'=>'04:00:00',
                'action' => '0',
                'status' => '0',
        ],  ['timezone_name' =>'(GMT-4:00) AST - Atlantic Standard Time',
                'time_difference'=>'04:00:00',
                'action' => '0',
                'status' => '0',
            ]]);
    }
}
