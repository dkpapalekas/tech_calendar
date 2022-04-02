<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Register a new User.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): Response {
        // Validate request.
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        // Create new User.
        $user = new User();
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->save();

        // Generate a token for the user.
        $token = $user->createToken('api_token')->plainTextToken;

        // Return User and Token.
        return response([
            'user' => $user,
            'token' => $token,
            'message' => 'User registered.',
        ], 201);
    }

    /**
     * Authenticate User.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request): Response {
        // Validate request.
        $credentials = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Try to authenticate User.
        if (Auth::attempt($credentials)) {
            // Authentication passed.

            // Get authenticated user.
            $user = Auth::user();

            // Generate a token for the user.
            $token = $user->createToken('api_token')->plainTextToken;

            // Return User and Token.
            return response([
                'user' => $user,
                'token' => $token,
                'message' => 'User authenticated.',
            ], 201);
        }

        // Authentication error.
        return response(['message' => 'This User doesn\'t exist.'], 401);
    }

    /**
     * Revoke User's tokens.
     * @param  \Illuminate\Http\Request  $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function revoke(Request $request): Response {
        // Revoke user's token.
        Auth::user()->tokens()->delete();

        return response(['message' => 'Logged out.']);
    }
}