<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company_id' => $this->faker->numberBetween(1, 8),
            'name' => $this->faker->firstNameMale(10),
            'surname' => $this->faker->lastName(10),
            'telephone' => $this->faker->randomNumber(5),
            'remarks' => $this->faker->text(10)
        ];
    }
}
