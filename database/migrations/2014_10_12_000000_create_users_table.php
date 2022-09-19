<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('password');
            $table->timestamps();
        });

        $email = env('DEFAULT_USER_EMAIL', 'test@example.com');
        $pwd = env('DEFAULT_USER_PASSWORD', 'test');

        error_log("CREATING DEFAULT USER {$email} WITH PASSWORD {$pwd}");

        DB::table('users')
            ->insert([
                [
                    'name' => 'User',
                    'email' => $email,
                    'password' => Hash::make($pwd),
                ]
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
