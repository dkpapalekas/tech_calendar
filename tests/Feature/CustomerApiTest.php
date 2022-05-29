<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class CustomerApiTest extends TestCase
{
    
    public function test_store_customer()
    {   
        $user = User::factory()->create();

        $form_data = [
            'company_id' => 5,
            'name' => 'Marini',
            'surname' => 'Kyriakideli',
            'telephone' => '6947539637',
            'remarks' => 'no  remarks'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/customer',$form_data)
            ->assertStatus(201);
    }

    public function test_store_customer_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'company_id' => 5,
            'name' => 'Dimitrios',
            'surname' => 'Papalekas',
            'telephone' => '6967539637',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/customer',$form_data)
            ->assertStatus(201);
    }

    public function test_store_customer_no_company()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'unemployed Dimitrios',
            'surname' => 'Papalekas',
            'telephone' => '6967579637',
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/customer',$form_data)
            ->assertStatus(201);
    }

    public function test_update_customer_nullables()
    {   
        $user = User::factory()->create();

        $form_data = [
            'company_id' => 5,
            'name' => 'Andreas',
            'surname' => 'Papalekas',
            'telephone' => '6969579637',
        ];

        $req = $this->actingAs($user)
            ->put('http://localhost:8000/api/v1/customers/4',$form_data)
            ->assertStatus(200);
    }

    // public function test_delete_customer()
    // {   
    //     $user = User::factory()->create();

    //     $req = $this->actingAs($user)
    //         ->delete('http://localhost:8000/api/v1/customers/6')
    //         ->assertStatus(200)
    //         ->dump();
    // }

    public function test_search_customer()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/customers/search/Papale')
            ->assertStatus(200);
    }

    public function test_customers_company()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/customers/company/8')
            ->assertStatus(200)
            ->dump();
    }

    public function test_customers_addresses()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/customers/addresses/3')
            ->assertStatus(200)
            ->dump();
    }
}
