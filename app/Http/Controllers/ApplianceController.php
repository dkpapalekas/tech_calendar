<?php

namespace App\Http\Controllers;

use App\Models\Appliance;
use App\Http\Resources\ApplianceResource;

//TODO add when job created
//use App\Http\Resources\JobResource;

use Illuminate\Http\Request;

class ApplianceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appliances = Appliance::paginate(10);
        return ApplianceResource::collection($appliances);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:appliances|max:255',
            'brand' => 'required',
            'model' => 'required',
            'year' => 'nullable',
            'remarks' => 'nullable',
        ]);

        $appliance = new Appliance();

        $appliance->name = $request->name;
        $appliance->brand = $request->brand;
        $appliance->model = $request->model;
        $appliance->year = $request->year;
        $appliance->remarks = $request->remarks;

        if($appliance->save()){
            return new ApplianceResource($appliance);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $appliance = Appliance::findOrFail($id);
        return new ApplianceResource($appliance);
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
        $validated = $request->validate([
            'name' => 'required|unique:appliances|max:255',
            'brand' => 'required',
            'model' => 'required',
            'year' => 'nullable',
            'remarks' => 'nullable',
        ]);

        $appliance = Appliance::findOrFail($id);

        $appliance->name = $request->name;
        $appliance->brand = $request->brand;
        $appliance->model = $request->model;
        $appliance->year = $request->year;
        $appliance->remarks = $request->remarks;

        if($appliance->save()){
            return new ApplianceResource($appliance);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $appliance = appliance::findOrFail($id);

        if($appliance->delete()){
            return new ApplianceResource($appliance);
        }
    }

    public function search($field)
    {
        return Appliance::where('name', 'like', '%'.$field.'%')
            ->orWhere('brand', 'like', '%'.$field.'%')
            ->orWhere('model', 'like', '%'.$field.'%')
            ->get();
    }

    // TODO uncomment when jobs created
    // //Retrieve all the jobs that belong to appliance with selected id
    // public function jobs($appliance_id)
    // {
    //     $jobs = Appliance::find($appliance_id)->jobs;
    //     return JobResource::collection($jobs);
    // }

}
