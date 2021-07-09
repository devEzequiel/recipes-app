## A Laravel API

## Requirements

As it is build on the Laravel framework, it has a few system requirements.

- PHP >= 7.3
- MySql >= 5.7
- Composer
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- Ctype PHP Extension
- JSON PHP Extension
- BCMath PHP Extension

You can check all the laravel related dependecies 
[here](https://laravel.com/docs/8.x/deployment#server-requirements)

## Running the API
Clone the repository and setup

`$ git clone https://github.com/devEzequiel/recipes-app.git` <br />
`$ cd recipes-app` <br />
`$ cd recipes-api`

Then, create the database and add them to the `.env` file.

```
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_password
```

Then install, migrate, seed, all that jazz:

1. `$ composer install`
2. `$ php artisan migrate:fresh --seed`
3. `$ php artisan key:generate`
4. `$ php artisan serve`

The API will be running on `localhost:8000`


## API Endpoints and Routes
Laravel follows the Model View Controller (MVC) pattern I have created models associated with
each resource. You can check in the **routes/api.php** file for all the routes that map to 
controllers in order to send out JSON data that make requests to our API. 


```
+--------+----------+--------------------------+-------------------------------+------------------------------------------------------------+------------------------------------------+
| Domain | Method   | URI                      | Name                          | Action                                                     | Middleware
           |
+--------+----------+--------------------------+-------------------------------+------------------------------------------------------------+------------------------------------------+
|        | GET|HEAD | /                        |                               | Closure                                                    | web
           |
|        | POST     | api/auth                 | auth.login                    | App\Http\Controllers\Api\Auth\AuthController@postAuth      | api
           |
|        | GET|HEAD | api/rates                | rate.get_all_rates_by_recipes | App\Http\Controllers\Api\Recipes\RateController@getRates   | api
           |
|        | POST     | api/rates/{id}           | rate.rate_recipe              | App\Http\Controllers\Api\Recipes\RateController@storeRate  | api
           |
|        | POST     | api/recipes              | recipes.create                | App\Http\Controllers\Api\Recipes\RecipeController@store    | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | GET|HEAD | api/recipes              | recipes.list                  | App\Http\Controllers\Api\Recipes\RecipeController@index    | api
           |
|        | GET|HEAD | api/recipes/{id}         | recipes.show                  | App\Http\Controllers\Api\Recipes\RecipeController@show     | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | PUT      | api/recipes/{id}         | recipes.update                | App\Http\Controllers\Api\Recipes\RecipeController@update   | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | DELETE   | api/recipes/{id}         | recipes.delete                | App\Http\Controllers\Api\Recipes\RecipeController@destroy  | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | POST     | api/users                | users.create                  | App\Http\Controllers\Api\Users\UserController@store        | api
           |
|        | GET|HEAD | api/users                | users.show                    | App\Http\Controllers\Api\Users\UserController@show         | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | PUT      | api/users                | users.update                  | App\Http\Controllers\Api\Users\UserController@update       | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | DELETE   | api/users/delete-account | users.delete                  | App\Http\Controllers\Api\Users\UserController@destroy      | api
           |
|        |          |                          |                               |      
                                                      | App\Http\Middleware\Authenticate:sanctum |
|        | GET|HEAD | sanctum/csrf-cookie      |                               | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show | web
           |
+--------+----------+--------------------------+-------------------------------+------------------------------------------------------------+------------------------------------------+
```

## Authorization

Some routes are protected by sanctum middleware. 
To have access, login and use the **Bearer Token** that will be returned in the json response.
