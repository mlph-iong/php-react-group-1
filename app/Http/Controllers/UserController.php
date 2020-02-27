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

        try {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $userFullDetails = $user::with("roles")->findOrFail($user->id);
            $responseVal = response()->json([
                'success' => true,
                'data' => $userFullDetails
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
        $user = User::findOrFail($id);
        if( $input['password'] != null ) {
            $input['password'] = bcrypt($input['password']);
        } else {
            $input['password'] = $user->password;       
        }
        $user->update($input);
        
		return response()->json([
			'user' => $user,
		]);
    }

    public function testUser(Request $requeust) {
        $user = User::find(1);
        // $user->roles()->attach(1);
        print($user->roles()->first());
    }
}
