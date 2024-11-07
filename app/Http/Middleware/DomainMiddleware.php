<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Common\Domains\CustomDomain;
use Illuminate\Support\Facades\Redirect;

class DomainMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $requestHost = $request->getHttpHost();

        if($requestHost != "my.taptoconnect.app"){
            $existsInSqrive = CustomDomain::where("host", $requestHost)->first();
            if(!$existsInSqrive){
                // return Redirect::to(url()->current()."/dp");
                $fullUrl = url()->full();
                $redirectUrl = str_replace($requestHost,$requestHost."/dp/", $fullUrl);
                return Redirect::to($redirectUrl);
            }
        }

        return $next($request);
    }
}
