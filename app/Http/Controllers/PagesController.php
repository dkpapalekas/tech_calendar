<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index() {
        return response()->file(public_path('index.html'));
        // return view('welcome');
    }
}
