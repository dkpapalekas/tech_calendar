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
            'name' => $this->faker->Company(1),
            'brand' => $this->faker->Company(1),
            'model' => $this->faker->Company(1),
            'year'=> $this->faker->year(),
            'remarks' => $this->faker->text(10),
        ];
    }
}
