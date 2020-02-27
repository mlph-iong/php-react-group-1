<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Role;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests\RegistrationFormRequest;

class LoginController extends Controller
{
    public $loginAfterSignUp = false;
    private const SUCCESS = "success";
    private const MESSAGE = "message";
    private const TOKEN = "token";

    public function login(Request $request)
    {
        $input = $request->only('username', 'password');
        $token = null;

        if (!$token = JWTAuth::attempt($input)) {
            return response()->json([
                self::SUCCESS => false,
                self::MESSAGE => 'Invalid Username or Password',
            ], 401);
        }

        return response()->json([
            self::SUCCESS => true,
            self::TOKEN => $token,
        ]);
    }
    
    public function logout(Request $request)
    {
        $responseVal = null;
        $this->validate($request, [
            self::TOKEN => 'required'
        ]);

        try {
           JWTAuth::invalidate($request->token);

            $responseVal = response()->json([
                self::SUCCESS => true,
                self::MESSAGE => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            $responseVal = response()->json([
                self::SUCCESS => false,
                self::MESSAGE => 'Sorry, the user cannot be logged out'
            ], 500);
        }
        
        return $responseVal;
    }

    public function register(RegistrationFormRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->email = $request->email;
        $user->contact_no = $request->contact_no;
        $user->save();

        if($request->role == config('enums.userRoles.SERVICE_PROVIDER') 
            || $request->role == config('enums.userRoles.ADMIN')
            || $request->role == config('enums.userRoles.CUSTOMER') ) {
            $role = Role::where('key', '=', $request->role)->first();
            print($role);
            $user->roles()->attach($role);
            print("werty");
        }

        if ($this->loginAfterSignUp) {
            return $this->login($request);
        }

        return response()->json([
            self::SUCCESS   =>  true,
            'data'      =>  $user
        ], 200);
    }
}
