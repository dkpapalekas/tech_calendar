<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Resources\CompanyResource;
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
        $validated = $request->validate([
            'name' => 'required|unique:companies|max:255',
            'address' => 'required',
            'city' => 'required',
            'profession' => 'required',
            'vat' => 'required',
            'irs' => 'required',
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
            'name' => 'required|unique:companies|max:255',
            'address' => 'required',
            'city' => 'required',
            'profession' => 'required',
            'vat' => 'required',
            'irs' => 'required',
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
}
