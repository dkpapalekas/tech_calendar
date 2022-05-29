<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'address_id' => $this->faker->numberBetween(1, 8),
            'appliance_id' => $this->faker->numberBetween(1, 8),
            'client_status' => 'OK',
            'date' => $this->faker->dateTime(),
            'agreed_price' => $this->faker->randomNumber(2),
            'is_completed' => $this->faker->boolean(),
        ];
    }
}
