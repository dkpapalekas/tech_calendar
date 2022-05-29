<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::paginate(10);
        return CompanyResource::collection($companies);
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
            'name' => 'required|unique:companies|max:255',
            'address' => 'required|string',
            'city' => 'required|string',
            'profession' => 'nullable|string',
            'vat' => 'required|integer',
            'irs' => 'nullable|string',
        ]);

        $company = new Company();

        $company->name = $request->name;
        $company->address = $request->address;
        $company->city = $request->city;
        $company->profession = $request->profession;
        $company->vat = $request->vat;
        $company->irs = $request->irs;

        if($company->save()){
            return new CompanyResource($company);
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
        $company = Company::findOrFail($id);
        return new CompanyResource($company);
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
            'name' => 'required|unique:companies|max:255',
            'address' => 'required|string',
            'city' => 'required|string',
            'profession' => 'nullable|string',
            'vat' => 'required|integer',
            'irs' => 'nullable|string',
        ]);

        $company = Company::findOrFail($id);

        $company->name = $request->name;
        $company->address = $request->address;
        $company->city = $request->city;
        $company->profession = $request->profession;
        $company->vat = $request->vat;
        $company->irs = $request->irs;

        if($company->save()){
            return new CompanyResource($company);
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
        $company = Company::findOrFail($id);

        if($company->delete()){
            return new CompanyResource($company);
        }
    }

    /**
     * Search Company based on Name or VAT
     * 
     * @param str $name
     * @return \Illuminate\Http\Response
     */
    public function search($field)
    {
        return Company::where('name', 'like', '%'.$field.'%')
            ->orWhere('vat', 'like', '%'.$field.'%')
            ->orWhere('city', 'like', '%'.$field.'%')
            ->get();
    }

    //Retrieve all the customers that belong to company with selected id
    public function customers($company_id)
    {
        $customers = Company::find($company_id)->customers;
        return CustomerResource::collection($customers);
    }
}
