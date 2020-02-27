<?php

namespace App\Http\Middleware;

use Closure;

class RoleAdmin
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
        $header = $request->header('Authorization');
        $user = JWTAuth::toUser($header);
        $isAdmin = false;

        foreach( $user->roles() as $role ) {
            if( $role->key === config('enums.userRoles.ADMIN') ) {
                $isAdmin = true;
            }
        }
        if( $isAdmin ) {
            return $next($request);
        } else {
            return false;
        }
    }
}
