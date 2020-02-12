<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests\RegistrationFormRequest;

class UserController extends Controller {

    public function getUsers(Request $request) {
        return User::all();
    }

    public function delete(User $user) {
        $user->delete();
        return response()->json(null, 204);
    }

}
