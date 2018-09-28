<?php

namespace App\Http\Middleware;

use App\Helpers\Helper;
use Closure;

class VerifyUserToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = Helper::getUserIdFromToken($request->token);
        if($userId > 0){
            \Log::info($userId);
            return $next($request);
        }else{
            \Log::info('Not Found ');
            return \Response::json(['status'=>false,'isAuthenticated'=>false],401);
        }
    }
}
