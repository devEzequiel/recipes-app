<?php

namespace App\Http\Controllers\Recipes;

use App\Exceptions\DefaultException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRecipeRequest;
use App\Http\Resources\RecipeResource;
use App\Repositories\Contracts\RecipeRepositoryInterface;
use Illuminate\Http\Request;

class RecipeController extends Controller
{

    private $recipe;

    public function __construct(RecipeRepositoryInterface $recipe)
    {
        $this->recipe = $recipe;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRecipeRequest $request)
    {
        $data = $request->all();

        try {
            $recipe = $this->recipe->createRecipe($data);

            return response()->json([
                'data' => ['message' => 'User created successfully!', 'user' => $recipe]
            ], 201);
        } catch (DefaultException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $recipe = $this->recipe->find($id);

            if (!$recipe) {
                return response()->json([
                    'message' => 'This recipe doesn\'t exists'
                ]);
            }

            $recipe = new RecipeResource($recipe);
            return response()->json(['data' => $recipe], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                 'message' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
