<?php

use App\Http\Controllers\CompanyController;
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
    Route::get('/companies/search/{name}', [CompanyController::class, 'search']);

    Route::post('/revoke', 'AuthController@revoke');
});

