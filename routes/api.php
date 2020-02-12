<?php

use Illuminate\Http\Request;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'LoginController@login');
Route::post('register', 'LoginController@register');

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('logout', 'LoginController@logout');
    Route::get('users/current-user', 'UserController@getCurrentUser');
});

Route::get('users', function () {
    return response(User::all(),200);
});
Route::post('users', 'UserController@getUsers');

Route::delete('users/{user}', function($userId) {
    User::find($userId)->delete();
    return 204;
});
Route::delete('users/{user}', 'UserController@delete');