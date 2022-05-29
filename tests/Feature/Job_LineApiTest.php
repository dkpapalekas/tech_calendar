<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class Job_LineApiTest extends TestCase
{
    public function test_store_job_lines()
    {   
        $user = User::factory()->create();

        $form_data = [
            'job_id' => 5,
            'material_id' => 6,
            'quantity' => 2,
            'price' => 32,
            'status' => 'stock',
            'remarks' => 'no remarks'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/job_lines',$form_data)
            ->assertStatus(201);
    }

    public function test_store_job_lines_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'job_id' => 5,
            'material_id' => 7,
            'quantity' => 2,
            'price' => 32,
            'status' => 'stock',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/job_lines',$form_data)
            ->assertStatus(201);
    }

    public function test_update_job_lines_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'job_id' => 5,
            'material_id' => 7,
            'quantity' => 2,
            'price' => 66,
            'status' => 'stock',
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/job_lines/4',$form_data)
            ->assertStatus(200);
    }

    public function test_search_job_line()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/job_lines/search/stock')
            ->assertStatus(200);
    }

    public function test_job_lines_job()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/job_lines/job/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_job_lines_material()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/job_lines/material/4')
            ->assertStatus(200)
            ->dump();
    }
}
