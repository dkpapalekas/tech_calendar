<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AddressApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_store_address()
    {   
        $user = User::factory()->create();

        $form_data = [
            'customer_id' => 4,
            'name' => 'Apostolou Pavlou 24',
            'number' => 6,
            'city' => 'Kalampaka',
            'floor' => 5,
            'remarks' => 'new remark'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/address',$form_data)
            ->assertStatus(201);
    }

    public function test_get_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/addresses/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_index_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/addresses')
            ->assertStatus(200);
            //->dump();
    }

    public function test_update_address()
    {   
        $user = User::factory()->create();

        $form_data = [
            'customer_id' => 5,
            'name' => 'newwwww',
            'number' => 6,
            'city' => 'Korinthos',
            'floor' => 5,
            'remarks' => 'remark',
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/addresses/4',$form_data)
            ->assertStatus(200);
    }

    public function test_delete_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->delete('http://localhost:8000/api/v1/addresses/6')
            ->assertStatus(200)
            ->dump();
    }

    public function test_search_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/addresses/search/324')
            ->assertStatus(200);
    }

    public function test_customers_address()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/addresses/customer/3')
            ->assertStatus(200)
            ->dump();
    }
}
