<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class Job_LineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'job_id' => $this->faker->numberBetween(1, 8),
            'material_id' => $this->faker->numberBetween(1, 8),
            'quantity' => $this->faker->numberBetween(1, 8),
            'price' => $this->faker->randomNumber(2),
            'status' => 'pending',
            'remarks' => $this->faker->text(10)
        ];
    }
}
