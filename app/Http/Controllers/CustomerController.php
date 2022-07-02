<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Address;
use App\Models\Job;
use App\Models\Job_Line;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\AddressResource;
use App\Http\Resources\Job_LineResource;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::paginate(1000);
        $customers = $customers->sortBy('surname');
        return CustomerResource::collection($customers);
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
            'company_id' => 'nullable|integer',
            'name' => 'required|string',
            'surname' => 'required|string',
            'telephone' => 'required|string|unique:customers',
            'remarks' => 'nullable',
        ]);

        $customer = new Customer();

        $customer->company_id = $request->company_id;
        $customer->name = $request->name;
        $customer->surname = $request->surname;
        $customer->telephone = $request->telephone;
        $customer->remarks = $request->remarks;

        if($customer->save()){
            return new CustomerResource($customer);
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
        $customer = Customer::findOrFail($id);
        return new CustomerResource($customer);
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
            'company_id' => 'nullable|integer',
            'name' => 'required|string',
            'surname' => 'required|string',
            'telephone' => 'required|string',
            'remarks' => 'nullable',
        ]);

        $customer = Customer::findOrFail($id);

        $customer->company_id = $request->company_id;
        $customer->name = $request->name;
        $customer->surname = $request->surname;
        $customer->telephone = $request->telephone;
        $customer->remarks = $request->remarks;

        if($customer->save()){
            return new CustomerResource($customer);
        }
    }

    public function search($field)
    {
        return Customer::where('name', 'like', '%'.$field.'%')
            ->orWhere('surname', 'like', '%'.$field.'%')
            ->orWhere('telephone', 'like', '%'.$field.'%')
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
        $customer = Customer::findOrFail($id);

        if($customer->delete()){
            return new CustomerResource($customer);
        }
    }

    //Find in which company the customer belongs
    public function company($customer_id)
    {
        $company = Customer::find($customer_id)->company;//->id;
        return new CompanyResource($company);
    }

    //Retrieve all the addresses that belong to customer with selected id
    public function addresses($customer_id)
    {
        $addresses = Customer::find($customer_id)->addresses;
        return AddressResource::collection($addresses);
    }

    //Retrieve all the JOBS that belong to customer with selected id
    public function jobs($customer_id)
    {
        $addresses = Customer::find($customer_id)->addresses;
        $addresses_ids =  AddressResource::collection($addresses)->map(function ($address) {
            return $address->id;
        });
        $jobs = $addresses_ids-> map(function ($id){
            return Address::find($id)->jobs;
        });

        return $jobs->flatten();
    }

    //Retrieve all PENDING JOBS that belong to customer with selected id
    public function pending_jobs($customer_id)
    {
        $addresses = Customer::find($customer_id)->addresses;
        $addresses_ids =  AddressResource::collection($addresses)->map(function ($address) {
            return $address->id;
        });
        $jobs = $addresses_ids-> map(function ($id){
            return Address::find($id)->jobs;
        });
        $pending_jobs = $jobs->flatten()
        ->filter(function ($job){
            return $job->is_completed == 0;
        });
        return $pending_jobs->flatten();
    }

    //Retrieve all appliances that belong to customer with selected id
    public function appliances($customer_id)
    {
        $addresses = Customer::find($customer_id)->addresses;
        $addresses_ids =  AddressResource::collection($addresses)->map(function ($address) {
            return $address->id;
        });
        $jobs = $addresses_ids-> map(function ($id){
            return Address::find($id)->jobs;
        });
        $jobs = $jobs->flatten();
        $job_ids = $jobs->map(function ($job) {
            return $job->id;
        });
        $appliances = $job_ids->map(function ($id){
            return Job::find($id)->appliance;
        });

        return $appliances->flatten();
    }

    //Retrieve all materials that belong to customer with selected id
    public function materials($customer_id)
    {
        $addresses = Customer::find($customer_id)->addresses;
        $addresses_ids =  AddressResource::collection($addresses)->map(function ($address) {
            return $address->id;
        });
        $jobs = $addresses_ids-> map(function ($id){
            return Address::find($id)->jobs;
        });
        $jobs = $jobs->flatten();
        $job_ids = $jobs->map(function ($job) {
            return $job->id;
        });
        $job_lines = $job_ids->map(function ($id){
            return Job::find($id)->job_lines;
        })->flatten();

        $job_lines_ids = Job_LineResource::collection($job_lines)->map(function ($job_line) {
            return $job_line->id;
        });

        $materials = $job_lines_ids-> map(function ($id){
            return Job_Line::find($id)->material;
        });

        return $materials->flatten();
    }
}
