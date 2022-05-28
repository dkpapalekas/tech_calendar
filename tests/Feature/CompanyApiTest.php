<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class CompanyApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_store_company()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Control System SA',
            'address' => 'Perikleous 24',
            'city' => 'Thermi',
            'profession' => 'automation',
            'vat' => 132456,
            'irs' => 'new remark'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/company',$form_data)
            ->assertStatus(201);
    }

    public function test_store_company_null_profession()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Jumbo',
            'address' => 'Sofokli 24',
            'city' => 'Athens',
            'vat' => 43534,
            'irs' => 'new remark'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/company',$form_data)
            ->assertStatus(201);
    }

    public function test_store_company_same_vat()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Company three js',
            'address' => 'antigonis 24',
            'city' => 'kalampaka',
            'profession' => 'industry',
            'vat' => 132456,
            'irs' => 'new remark'
        ];

        //need Error assertion
        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/company',$form_data)
            ->assertStatus(500);
    }

    public function test_get_company()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/companies/4')
            ->assertStatus(200)
            ->dump();
    }

    public function test_index_companies()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/companies')
            ->assertStatus(200);
            //->dump();
    }

    public function test_update_company()
    {   
        $user = User::factory()->create();

        $form_data = [
            'name' => 'Updated Company',
            'address' => 'Perikleous 24',
            'city' => 'Thermi',
            'profession' => 'automation',
            'vat' => 132458,
            'irs' => 'new remark'
        ];

        $req = $this->actingAs($user)
            ->post('http://localhost:8000/api/v1/company',$form_data)
            ->assertStatus(201);
    }

    public function test_delete_company()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->delete('http://localhost:8000/api/v1/companies/6')
            ->assertStatus(200)
            ->dump();
    }

    public function test_search_company()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->getJson('http://localhost:8000/api/v1/companies/search/three')
            ->assertStatus(200);
    }

    //Retrieve all the customers that belong to company with selected id
    public function test_customers_company()
    {   
        $user = User::factory()->create();

        $req = $this->actingAs($user)
            ->get('http://localhost:8000/api/v1/companies/customers/3')
            ->assertStatus(200)
            ->dump();
    }
}
