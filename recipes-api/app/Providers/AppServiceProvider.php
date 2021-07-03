<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Repositories\Contracts\UserRepositoryInterface',
            'App\Repositories\Eloquent\UserRepository'
        );

        $this->app->bind(
            'App\Repositories\Contracts\RecipeRepositoryInterface',
            'App\Repositories\Eloquent\RecipeRepository'
        );

        $this->app->bind(
            'App\Repositories\Contracts\AuthRepositoryInterface',
            'App\Repositories\Eloquent\AuthRepository'
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
