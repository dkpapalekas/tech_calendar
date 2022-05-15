<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
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

    // CustomerController Routes
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customer', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
    Route::get('/customers/search/{field}', [CustomerController::class, 'search']);

    //Find in which company belongs the customer
    Route::get('/customers/company/{id}', [CustomerController::class, 'company']);


    Route::post('/revoke', 'AuthController@revoke');
});

