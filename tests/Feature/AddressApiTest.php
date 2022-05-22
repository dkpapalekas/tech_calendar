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
            'remarks' => 'poutso'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/address',$form_data)
            ->assertStatus(201);
    }
}
