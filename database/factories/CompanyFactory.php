<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->Company(10),
            'address' => $this->faker->address(10),
            'city' => $this->faker->city(10),
            'profession' => $this->faker->bs(10),
            'vat' => $this->faker->numerify('########'),
            'irs' => $this->faker->text(10)
        ];
    }
}
