<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Resources\CompanyResource;
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
        $customers = Customer::paginate(10);
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
            'company_id' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'telephone' => 'required',
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
            'company_id' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'telephone' => 'required',
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
}
