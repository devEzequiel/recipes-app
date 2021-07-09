<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Exceptions\DefaultException;
use App\Http\Controllers\Controller;
use App\Http\Requests\RateRequest;
use App\Repositories\Contracts\RecipeRepositoryInterface;
use Illuminate\Http\Request;

class RateController extends Controller
{
    private $rate;

    public function __construct(RecipeRepositoryInterface $rate)
    {
        $this->rate = $rate;
    }

    public function storeRate(RateRequest $request, int $id)
    {
        $data = $request->all();
        $data['recipe_id'] = $id;

        //there may only be one rating by email
        try {
            $this->rate->rateRecipe($data);

            return response()->json([
                'message' => 'Rate sent successfully'
            ], 201);
        } catch (DefaultException $e) {

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function getRates()
    {
        try {
            $rates = $this->rate->getRatesByRecipe();

            return response()->json([
                'rate' => $rates
            ], 200);

        } catch (DefaultException $e) {

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());

        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
