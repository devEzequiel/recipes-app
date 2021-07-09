<?php

namespace App\Repositories\Eloquent;

use App\Exceptions\DefaultException;
use App\Models\Rate;
use App\Models\Recipe;
use App\Repositories\Contracts\RecipeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RecipeRepository extends AbstractRepository implements RecipeRepositoryInterface
{
    protected $model = Recipe::class;

    public function createRecipe($data)
    {
        try {
            // dd($data);
            $data['slug'] = Str::slug($data['name']);
            $recipe = $this->create($data);

            if (!$recipe) {
                throw new DefaultException('There was an error creating the recipe', 422);
            }

            return $recipe;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function updateRecipe($data, $id)
    {
        try {
            $recipe = $this->find($id);

            // dd($data);

            if (!$recipe) {
                throw new DefaultException('Recipe don\'t found', 422);
            }

            $recipe->update($data);

            return $recipe;
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        }
    }

    public function deleteRecipe($id)
    {
        $user = $this->find($id);

        if (!$user) {
            throw new DefaultException('It was not possible to delete this recipe', 500);
        }

        $user->delete();

        return true;
    }


    public function rateRecipe($data)
    {

        $rates = Rate::where('email', $data['email'])
            ->where('recipe_id', $data['recipe_id'])
            ->first();

        if ($rates) {
            throw new DefaultException('You\'ve already rated this recipe', 422);
        }

        $rate = Rate::create($data);

        return $rate;
    }

    public function getRatesByRecipe()
    {
        $rates = DB::table('rates')
            ->select(DB::raw('recipe_id, avg(rate) as rates'))
            ->groupBy('recipe_id')
            ->get();

        if (!$rates) {
            throw new DefaultException('No one rated this recipe', 200);
        }

        return $rates;
    }
}
