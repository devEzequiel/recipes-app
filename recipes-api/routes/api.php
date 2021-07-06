<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Users\UserController;
use App\Http\Controllers\Api\Recipes\RecipeController;
use App\Http\Controllers\Api\Recipes\RateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//users endpoints
Route::namespace('Api')->name('users.')->prefix('users')->group(function () {

    Route::post('/', [UserController::class, 'store'])
        ->name('create');
    Route::get('/', [UserController::class, 'show'])
        ->name('show')->middleware('auth:sanctum');
    Route::put('/', [UserController::class, 'update'])
        ->name('update')->middleware('auth:sanctum');
    Route::delete('/delete-account', [UserController::class, 'destroy'])
        ->name('delete')->middleware('auth:sanctum');
});

//recipes endpoints
Route::namespace('Api')->name('recipes.')->prefix('recipes')->group(function () {

    Route::post('/', [RecipeController::class, 'store'])
        ->name('create')->middleware('auth:sanctum');
    Route::get('/{id}', [RecipeController::class, 'show'])
        ->name('show')->middleware('auth:sanctum');
    Route::get('/', [RecipeController::class, 'index'])
        ->name('list');
    Route::put('/{id}', [RecipeController::class, 'update'])
        ->name('update')->middleware('auth:sanctum');
    Route::delete('/{id}', [RecipeController::class, 'destroy'])
        ->name('delete')->middleware('auth:sanctum');

    //endpoint where a vistor can rate a recipe
    Route::post('/{id}', [RateController::class, 'storeRate'])
        ->name('rate_recipe');
});

Route::namespace('Api')->name('auth.')->prefix('auth')->group(function () {

    Route::post('/', [AuthController::class, 'postAuth'])
        ->name('login');
});

