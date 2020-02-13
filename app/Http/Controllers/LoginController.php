<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
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
        $user->save();

        if ($this->loginAfterSignUp) {
            return $this->login($request);
        }

        return response()->json([
            self::SUCCESS   =>  true,
            'data'      =>  $user
        ], 200);
    }
}
