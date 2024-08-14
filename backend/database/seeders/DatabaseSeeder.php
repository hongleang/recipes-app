<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Recipe::factory(20)->create();
        Ingredient::factory(40)->create();

        $recipes = Recipe::all();

        foreach ($recipes as $recipe) {
            $recipe->ingredients()->attach(
                Ingredient::all()->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
