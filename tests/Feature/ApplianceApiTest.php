<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class ApplianceApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    
    public function test_store_appliance()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Refridgerator',
            'brand' => 'LG',
            'model' => 'modeling',
            'year' => 2022,
            'remarks' => 'apple remarks',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/appliance',$form_data)
            ->assertStatus(201);
    }

    public function test_store_appliance_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Refridgerator',
            'brand' => 'LG',
            'model' => 'modeling',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/appliance',$form_data)
            ->assertStatus(201);
    }

    public function test_get_appliance()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/appliances/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_index_appliances()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/appliances')
            ->assertStatus(200);
            //->dump();
    }

    public function test_update_appliance()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'updated Refridgerator',
            'brand' => 'updated LG',
            'model' => 'modeling',
            'remarks' => 'apple remarks',
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/appliances/5',$form_data)
            ->assertStatus(200);
    }

    // public function test_delete_appliance()
    // {   
    //     $user = User::factory()->create();

    //     $req = $this->actingAs($user)
    //         ->delete('http://localhost:8000/api/v1/appliances/6')
    //         ->assertStatus(200)
    //         ->dump();
    // }

    public function test_search_appliance()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/appliances/search/LG')
            ->assertStatus(200);
    }

    //Retrieve all the jobs that belong to appliance with selected id
    public function test_jobs_appliance()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/appliances/jobs/3')
            ->assertStatus(200)
            ->dump();
    }
}
