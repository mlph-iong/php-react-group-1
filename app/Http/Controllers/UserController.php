<?php

namespace App\Http\Controllers;

use JWTAuth;
use Auth;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests\EditUserFormRequest;

class UserController extends Controller {

    public function getUsers(Request $request) {
        return User::all();
    }

    public function delete($userId) {
        User::find($userId)->delete();
        return response()->json(null, 204);
    }

    public function getCurrentUser(Request $request) {
        $responseVal = null;
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            $responseVal = response()->json([
                'success' => true,
                'data' => JWTAuth::toUser(JWTAuth::getToken())
            ]);
         } catch (JWTException $exception) {
            $responseVal = response()->json([
                'success' => false,
                'message' => 'Sorry, the user is not logged in.'
            ], 500);
         }

         return $responseVal;
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
		return response()->json([
			'user' => $user,
		]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        if( $input['password'] != null ) {
            $input['password'] = bcrypt($input['password']);
        }
        $user = User::findOrFail($id);
		$user->update($input);
		return response()->json([
			'user' => $user,
		]);
    }
}
