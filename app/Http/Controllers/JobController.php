<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Http\Resources\JobResource;
use App\Http\Resources\AddressResource;
use App\Http\Resources\ApplianceResource;
use App\Http\Resources\Job_LinesResource;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::paginate(10);
        return JobResource::collection($jobs);
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
            'address_id' => 'required',
            'appliance_id' => 'required',
            'client_status' => 'required',
            'date' => 'required',
            'agreed_price' => 'required',
            'is_completed' => 'required',
        ]);

        $job = new Job();

        $job->address_id = $request->address_id;
        $job->appliance_id = $request->appliance_id;
        $job->client_status = $request->client_status;
        $job->date = $request->date;
        $job->agreed_price = $request->agreed_price;
        $job->is_completed = $request->is_completed;  
        
        if($job->save()){
            return new JobResource($job);
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
        $job = Job::findOrFail($id);
        return new JobResource($job);
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
            'address_id' => 'required',
            'appliance_id' => 'required',
            'client_status' => 'required',
            'date' => 'required',
            'agreed_price' => 'required',
            'is_completed' => 'required',
        ]);

        $job = Job::findOrFail($id);

        $job->address_id = $request->address_id;
        $job->appliance_id = $request->appliance_id;
        $job->client_status = $request->client_status;
        $job->date = $request->date;
        $job->agreed_price = $request->agreed_price;
        $job->is_completed = $request->is_completed;  
        
        if($job->save()){
            return new JobResource($job);
        }
    }

    public function search($field)
    {
        return Customer::where('address_id', 'like', '%'.$field.'%')
            ->orWhere('appliance_id', 'like', '%'.$field.'%')
            ->orWhere('date', 'like', '%'.$field.'%')
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
        $job = Job::findOrFail($id);

        if($job->delete()){
            return new JobResource($job);
        }
    }

    //Find in which address the job belongs
    public function address($job_id)
    {
        $address = Job::find($job_id)->address;//->id;
        return new AddressResource($address);
    }

    //Find in which appliance the job belongs
    public function appliance($job_id)
    {
        $appliance = Job::find($job_id)->appliance;//->id;
        return new ApplianceResource($appliance);
    }

    //Retrieve all the addresses that belong to customer with selected id
    //                 job_lines                 job
    public function job_lines($job_id)
    {
        $job_lines = Job::find($job_id)->job_lines;
        return Job_LineResource::collection($job_lines);
    }
}
