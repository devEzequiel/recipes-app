<?php

namespace App\Repositories\Contracts;

interface RecipeRepositoryInterface 
{
    public function find (int $id);
    public function createRecipe ($data);
    public function rateRecipe ($data);
    public function all();
    public function updateRecipe ($data, $id);
    public function deleteRecipe ($id);
}