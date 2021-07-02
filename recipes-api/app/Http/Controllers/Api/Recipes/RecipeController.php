<?php

namespace app\Http\Controllers\Api\Recipes;

use Illuminate\Http\Request;
use App\Exceptions\DefaultException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRecipeRequest;
use App\Http\Resources\RecipeCollection;
use App\Http\Resources\RecipeResource;
use App\Repositories\Contracts\RecipeRepositoryInterface;


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
        try {
            $recipe = $this->recipe->all();

            return new RecipeCollection($recipe);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
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
        // dd($data['image']);
        $data['user_id'] = 1;

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $path = $request->file('image')->store('images', 'public');
            // dd($path);
            $data['image'] = $path;
        } else {
            unset($data['image']);
        }

        try {
            $recipe = $this->recipe->createRecipe($data);

            return response()->json([
                'data' => ['message' => 'Recipe created successfully!', 'recipe' => $recipe]
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
        $data = $request->all();
        dd($request->all());

        //vefify if image field is valid
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $path = $request->file('image')->store('images', 'public');

            $data['image'] = $path;
        } else {
            unset($data['image']);
        }

        try {

            $recipe = $this->recipe->updateRecipe($data, $id);

            return response()->json([
                'data' => [
                    'message' => 'Recipe updated successfully!',
                    'recipe' => $recipe
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $this->recipe->deleteRecipe(2);

            return response()->json(['status' => 'success', 'message' => 'Recipe deleted successfully'], 200);
        } catch (DefaultException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 422);
        }
    }
}
