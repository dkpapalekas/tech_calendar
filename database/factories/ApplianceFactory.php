<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ApplianceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->lastName(),
            'brand' => $this->faker->lastName(),
            'model' => $this->faker->lastName(),
            'year'=> $this->faker->year(),
            'remarks' => $this->faker->text(10),
        ];
    }
}
