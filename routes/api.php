<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ApplianceController;
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

// Public Routes
Route::post('/register', 'AuthController@register');
Route::post('/authenticate', 'AuthController@authenticate');

// Protected Routes
Route::middleware('auth:sanctum')->group(function() {
    // CompanyController Routes
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::post('/company', [CompanyController::class, 'store']);
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
    Route::post('/customer', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
    Route::get('/customers/search/{field}', [CustomerController::class, 'search']);

    //Find in which company belongs the customer
    Route::get('/customers/company/{id}', [CustomerController::class, 'company']);
    //Retrieve all the addresses that belong to customer with selected id
    Route::get('/customers/addresses/{id}', [CustomerController::class, 'addresses']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // AddressController Routes
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/address', [AddressController::class, 'store']);
    Route::get('/addresses/{id}', [AddressController::class, 'show']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);
    Route::get('/addresses/search/{field}', [AddressController::class, 'search']);

    //Find in which customer belongs the address
    Route::get('/addresses/customer/{id}', [AddressController::class, 'customer']);
    //TODO Retrieve all the jobs that belong to address with selected id

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    
    // ApplianceController Routes
    Route::get('/appliances', [ApplianceController::class, 'index']);
    Route::post('/appliance', [ApplianceController::class, 'store']);
    Route::get('/appliances/{id}', [ApplianceController::class, 'show']);
    Route::put('/appliances/{id}', [ApplianceController::class, 'update']);
    Route::delete('/appliances/{id}', [ApplianceController::class, 'destroy']);
    Route::get('/appliances/search/{field}', [ApplianceController::class, 'search']);

    // TODO uncomment when jobs
    //Retrieve all the jobs that belong to appliance with selected id
    //Route::get('/appliances/jobs/{id}', [ApplianceController::class, 'jobs']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // MaterialController Routes
    Route::get('/materials', [MaterialController::class, 'index']);
    Route::post('/material', [MaterialController::class, 'store']);
    Route::get('/materials/{id}', [MaterialController::class, 'show']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);
    Route::get('/materials/search/{field}', [MaterialController::class, 'search']);

    //TODO uncomment when job_lines 
    // //Retrieve all the job_lines that belong to material with selected id
    // Route::get('/materials/job_lines/{id}', [MaterialController::class, 'job_lines']);

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    Route::post('/revoke', 'AuthController@revoke');
    
});