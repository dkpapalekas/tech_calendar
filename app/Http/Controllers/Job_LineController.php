<?php

namespace App\Http\Controllers;

use App\Models\Job_Line;
use App\Http\Resources\Job_LineResource;
use App\Http\Resources\JobResource;
use App\Http\Resources\MaterialResource;
use Illuminate\Http\Request;

class Job_LineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $job_lines = Job_Line::paginate(10);
        return Job_LineResource::collection($job_lines);
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
            'job_id' => 'required',
            'material_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'status' => 'required',
            'remarks' => 'nullable',
        ]);

        $job_line = new Job_line();

        $job_line->job_id = $request->job_id;
        $job_line->material_id = $request->material_id;
        $job_line->quantity = $request->quantity;
        $job_line->price = $request->price;
        $job_line->status = $request->status;
        $job_line->remarks = $request->remarks;

        if($job_line->save()){
            return new Job_LineResource($job_line);
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
        $job_line = Job_Line::findOrFail($id);
        return new Job_LineResource($job_line);
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
            'job_id' => 'required',
            'material_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'status' => 'required',
            'remarks' => 'nullable',
        ]);

        $job_line = Job_line::findOrFail($id);

        $job_line->job_id = $request->job_id;
        $job_line->material_id = $request->material_id;
        $job_line->quantity = $request->quantity;
        $job_line->price = $request->price;
        $job_line->status = $request->status;
        $job_line->remarks = $request->remarks;

        if($job_line->save()){
            return new Job_LineResource($job_line);
        }
    }


    //no need
    public function search($field)
    {
        return Job_Line::where('material_id', 'like', '%'.$field.'%')
            ->orWhere('status', 'like', '%'.$field.'%')
            ->get();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job_line = Job_Line::findOrFail($id);

        if($job_line->delete()){
            return new Job_LineResource($job_line);
        }
    }

    //Find in which job the job_line belongs
    public function job($job_line_id)
    {
        $job = Job_Line::find($job_line_id)->job;//->id;
        return new JobResource($job);
    }

    //Find in which material the job_line belongs
    public function material($job_line_id)
    {
        $material = Job_Line::find($job_line_id)->material;//->id;
        return new JobResource($mterial);
    }
}
