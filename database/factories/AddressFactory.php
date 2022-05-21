<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'customer_id' => $this->faker->numberBetween(1, 8),
            'name' => $this->faker->streetAddress(),
            'number' => $this->faker->numberBetween(1, 8),
            'city' => $this->faker->city(),
            'floor' => $this->faker->numberBetween(1, 8),
            'remarks' => $this->faker->text(10),
        ];
    }
}
