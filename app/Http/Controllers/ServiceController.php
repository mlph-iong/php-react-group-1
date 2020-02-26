<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    // apply auth middleware so only authenticated users have access
	// public function __construct() {
	// 	$this->middleware('auth');
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Service $service)
    {
        $allServices = $service::with("user")->get();
        return response()->json([
            'services' => $allServices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate
		$this->validate($request, [
			'name' => 'required|max:255',
        ]);
        
        $service = new Service();
		$service -> create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'service' => $service,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $service = Service::findOrFail($id);
		return response()->json([
			'service' => $service,
		]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // update service
		$input = $request->all();
		$service = Service::findOrFail($id);
		$service->update($input);
		return response()->json([
			'service' => $service,
		]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
    }
}
