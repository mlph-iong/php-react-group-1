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

Route::get('users', 'UserController@getUsers');
Route::get('users/{userId}', 'UserController@show');
Route::delete('users/{userId}', 'UserController@delete');
Route::put('users/{userId}', 'UserController@update');
Route::resource('services', 'ServiceController');
