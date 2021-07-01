<?php

namespace App\Repositories\Eloquent;

use App\Models\Recipe;
use App\Repositories\Contracts\RecipeRepositoryInterface;

class RecipeRepository extends AbstractRepository implements RecipeRepositoryInterface
{
    protected $model = Recipe::class;
    
    public function createRecipe($data)
    {
        
    }
}
