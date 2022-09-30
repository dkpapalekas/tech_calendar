<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ApplianceController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\Job_LineController;
use App\Http\Controllers\Files;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Protected Routes
Route::middleware('auth.basic')->group(function() {
    Route::post('/register', 'AuthController@register');
    Route::post('/authenticate', 'AuthController@authenticate');

    // CompanyController Routes
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::post('/companies', [CompanyController::class, 'store']);
    Route::get('/companies/{id}', [CompanyController::class, 'show']);
    Route::put('/companies/{id}', [CompanyController::class, 'update']);
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy']);
    Route::get('/companies/search/{field}', [CompanyController::class, 'search']);

    //Retrieve all the customers that belong to company with selected id
    Route::get('/companies/customers/{id}', [CompanyController::class, 'customers']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // CustomerController Routes
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
    Route::get('/customers/search/{field}', [CustomerController::class, 'search']);

    //Find in which company belongs the customer
    Route::get('/customers/company/{id}', [CustomerController::class, 'company']);
    //Retrieve all the addresses that belong to customer with selected id
    Route::get('/customers/addresses/{id}', [CustomerController::class, 'addresses']);

    //ultraqueries
    //find all jobs of a customer (completed or uncompleted)
    //the grouping can be done front-end
    Route::get('/customers/jobs/{id}', [CustomerController::class, 'jobs']);
    Route::get('/customers/pending_jobs/{id}', [CustomerController::class, 'pending_jobs']);

    //Retrieve all appliances belonging to the customer
    Route::get('/customers/appliances/{id}', [CustomerController::class, 'appliances']);

    //Retrieve all materials belonging to the customer
    Route::get('/customers/materials/{id}', [CustomerController::class, 'materials']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // AddressController Routes
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::get('/addresses/{id}', [AddressController::class, 'show']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);
    Route::get('/addresses/search/{field}', [AddressController::class, 'search']);

    //Find in which customer belongs the address
    Route::get('/addresses/customer/{id}', [AddressController::class, 'customer']);
    //Retrieve all the jobs that belong to address with selected id
    Route::get('/addresses/jobs/{id}', [AddressController::class, 'customer']);


    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // ApplianceController Routes
    Route::get('/appliances', [ApplianceController::class, 'index']);
    Route::post('/appliances', [ApplianceController::class, 'store']);
    Route::get('/appliances/{id}', [ApplianceController::class, 'show']);
    Route::put('/appliances/{id}', [ApplianceController::class, 'update']);
    Route::delete('/appliances/{id}', [ApplianceController::class, 'destroy']);
    Route::get('/appliances/search/{field}', [ApplianceController::class, 'search']);

    //Retrieve all the jobs that belong to appliance with selected id
    Route::get('/appliances/jobs/{id}', [ApplianceController::class, 'jobs']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // MaterialController Routes
    Route::get('/materials', [MaterialController::class, 'index']);
    Route::post('/materials', [MaterialController::class, 'store']);
    Route::get('/materials/{id}', [MaterialController::class, 'show']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);
    Route::get('/materials/search/{field}', [MaterialController::class, 'search']);

    //Retrieve all the job_lines that belong to material with selected id
    Route::get('/materials/job_lines/{id}', [MaterialController::class, 'job_lines']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // JobController Routes
    Route::controller(Jobs::class)->group(function() {
        Route::get('/jobs', 'index');
        Route::post('/jobs', 'store');
        Route::get('/jobs/{id}', 'show');
        Route::put('/jobs/{id}', 'update');
        Route::delete('/jobs/{id}', 'destroy');
        Route::get('/jobs/search/{field}', 'search');
        //Find in which address belongs the job
        Route::get('/jobs/address/{id}', 'address');
        //Find in which appliance belongs the job
        Route::get('/jobs/appliance/{id}', 'appliance');
        //Retrieve all the job_lines that belong to job with selected id
        Route::get('/jobs/job_lines/{id}', 'job_lines');
        //Retrieve all materials of a job
        Route::get('/jobs/materials/{id}', 'materials');
    });

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // Job_LineController Routes
    Route::get('/job_lines', [Job_LineController::class, 'index']);
    Route::post('/job_lines', [Job_LineController::class, 'store']);
    Route::get('/job_lines/{id}', [Job_LineController::class, 'show']);
    Route::put('/job_lines/{id}', [Job_LineController::class, 'update']);
    Route::delete('/job_lines/{id}', [Job_LineController::class, 'destroy']);
    Route::get('/job_lines/search/{field}', [Job_LineController::class, 'search']);

    //Find in which job belongs the job_line
    Route::get('/job_lines/job/{id}', [Job_LineController::class, 'company']);
    //Find in which material belongs the job_line
    Route::get('/job_lines/material/{id}', [Job_LineController::class, 'company']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    Route::post('/revoke', 'AuthController@revoke');

    // rpc
    Route::post('/rpc', [JSONRPC::class, 'route']);

    // files
    Route::get('/files', [Files::class, 'index']);
    Route::post('/files', [Files::class, 'create']);
});
