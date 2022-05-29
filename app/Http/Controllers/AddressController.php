<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\AddressResource;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addresses = Address::paginate(10);
        return AddressResource::collection($addresses);
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
            'customer_id' => 'required',
            'name' => 'required|string',
            'number' => 'required|integer',
            'city' => 'nullable|string',
            'floor' => 'nullable|integer',
            'remarks' => 'nullable',
        ]);

        $address = new Address();

        $address ->customer_id = $request->customer_id;
        $address ->name = $request->name;
        $address ->number = $request->number;
        $address ->city = $request->city;
        $address ->floor = $request->floor;
        $address ->remarks = $request->remarks;

        if($address->save()){
            return new AddressResource($address);
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
        $address = Address::findOrFail($id);
        return new AddressResource($address);
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
            'customer_id' => 'required',
            'name' => 'required|string',
            'number' => 'required|integer',
            'city' => 'nullable|string',
            'floor' => 'nullable|integer',
            'remarks' => 'nullable',
        ]);

        $address = Address::findOrFail($id);

        $address ->customer_id = $request->customer_id;
        $address ->name = $request->name;
        $address ->number = $request->number;
        $address ->city = $request->city;
        $address ->floor = $request->floor;
        $address ->remarks = $request->remarks;

        if($address->save()){
            return new AddressResource($address);
        }
    }

    public function search($field)
    {
        return Address::where('name', 'like', '%'.$field.'%')
            ->orWhere('number', 'like', '%'.$field.'%')
            ->orWhere('city', 'like', '%'.$field.'%')
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
        $address = Address::findOrFail($id);

        if($address->delete()){
            return new AddressResource($address);
        }
    }

    //Find in which company the customer belongs
    public function customer($address_id)
    {
        $customer = Address::find($address_id)->customer;//->id;
        return new CustomerResource($customer);
    }

    //retrieve all jobs of an address (like all addressesof customer)
    public function jobs($address_id)
    {
        $jobs = Address::find($address_id)->jobs;
        return JobResource::collection($jobs);
    }
}
