<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    const UNITS = ['cup', 'oz', 'unit'];

    use HasFactory;

    protected $fillable = [
        'name',
        'unit',
        'quantity'
    ];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipes_ingredients');
    }
}
