<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class MaterialApiTest extends TestCase
{
    public function test_store_material()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'lamp',
            'remarks' => 'lamp remarks',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/material',$form_data)
            ->assertStatus(201);
    }

    public function test_store_material_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'cord',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/material',$form_data)
            ->assertStatus(201);
    }

    public function test_get_material()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/materials/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_index_materials()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/materials')
            ->assertStatus(200);
            //->dump();
    }

    public function test_update_material()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'updated lamp cord',
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/materials/5',$form_data)
            ->assertStatus(200);
    }

    // public function test_delete_material()
    // {   
    //     $user = User::factory()->create();

    //     $req = $this->actingAs($user)
    //         ->delete('http://localhost:8000/api/v1/materials/6')
    //         ->assertStatus(200)
    //         ->dump();
    // }

    public function test_search_material()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/materials/search/LG')
            ->assertStatus(200);
    }

    //TODO uncomment after job_lines created
    // //Retrieve all the job_lines that belong to material with selected id
    // public function test_job_lines_material()
    // {   
    //     $user = User::factory()->create();

    //     $req = $this->actingAs($user)
    //         ->get('http://localhost:8000/api/v1/materials/job_lines/3')
    //         ->assertStatus(200)
    //         ->dump();
    // }
}
