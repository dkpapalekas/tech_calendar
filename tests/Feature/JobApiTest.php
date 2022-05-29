<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class JobApiTest extends TestCase
{
    public function test_store_job()
    {   
        $user = User::factory()->create();

        $form_data = [
            'address_id' => 5,
            'appliance_id' => 5,
            'client_status' => 'OK',
            'date' => '2022-08-17 23:44:02',
            'agreed_price' => 100,
            'is_completed' => 0,
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/job',$form_data)
            ->assertStatus(201);
    }

    public function test_update_job()
    {   
        $user = User::factory()->create();

        $form_data = [
            'address_id' => 7,
            'appliance_id' => 7,
            'client_status' => 'OK',
            'date' => '2022-08-17 23:45:07',
            'agreed_price' => 134,
            'is_completed' => 1,
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/jobs/4',$form_data)
            ->assertStatus(200);
    }

    public function test_search_job()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/jobs/search/2022')
            ->assertStatus(200);
    }

    public function test_jobs_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/jobs/address/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_jobs_appliance()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/jobs/appliance/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_job_job_lines()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/jobs/job_lines/4')
            ->assertStatus(200)
            ->dump();
    }
}
