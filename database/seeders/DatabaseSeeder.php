<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Company::factory(10)->create();
        \App\Models\Customer::factory(10)->create();
        \App\Models\Address::factory(10)->create();
        \App\Models\Appliance::factory(10)->create();
        \App\Models\Material::factory(10)->create();
    }
}
