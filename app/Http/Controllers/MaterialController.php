<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Resources\MaterialResource;

//TODO add when job lines created
//use App\Http\Resources\Job_LineResource;

use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $materials = Material::paginate(10);
        return MaterialResource::collection($materials);
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
            'name' => 'required|max:255',
            'remarks' => 'nullable',
        ]);

        $material = new Material();

        $material->name = $request->name;
        $material->remarks = $request->remarks;

        if($material->save()){
            return new MaterialResource($material);
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
        $material = Material::findOrFail($id);
        return new MaterialResource($material);
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
            'name' => 'required|max:255',
            'remarks' => 'nullable',
        ]);

        $material = Material::findOrFail($id);

        $material->name = $request->name;
        $material->remarks = $request->remarks;

        if($material->save()){
            return new MaterialResource($material);
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
        $material = Material::findOrFail($id);

        if($material->delete()){
            return new MaterialResource($material);
        }
    }

    public function search($field)
    {
        return Material::where('name', 'like', '%'.$field.'%')
            ->get();
    }

    // TODO uncomment when job_lines created
    // //Retrieve all the job_lines that belong to material with selected id
    // public function job_lines($material_id)
    // {
    //     $job_lines = Material::find($material_id)->jobs;
    //     return Job_LineResource::collection($job_liness);
    // }
}
