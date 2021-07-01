<?php

namespace App\Repositories\Contracts;

interface RecipeRepositoryInterface 
{
    public function find (int $id);
    public function createRecipe ($data);
    // public function updateUser ($data);
    // public function deleteUser ($id);
}