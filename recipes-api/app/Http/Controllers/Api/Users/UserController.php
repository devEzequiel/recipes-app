<?php

namespace App\Http\Controllers\Api\Users;

use App\Exceptions\DefaultException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    private $user;

    public function __construct(UserRepositoryInterface $user)
    {
        $this->user = $user;
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->all();

        dd($request->ip());

        try {
            $user = $this->user->createUser($data);

            return response()->json([
                'data' => ['message' => 'User created successfully!', 'user' => $user]
            ], 201);
        } catch (DefaultException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        try {
            $user = $this->user->find($id);

            if (!$user) {
                return response()->json(['message' => 'User doesn\'t found']);
            }

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 422);
        }
    }


    public function update(Request $request)
    {
        $data = $request->all();

        //verifying if the password field has been set
        if ($request->has('password') && $request->get('password')) {
            //validating password
            Validator::make($data, [
                'password' => 'required|min:4'
            ])->validate();

            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        try {

            $user = $this->user->updateUser($data);

            return response()->json([
                'data' => [
                    'message' => 'User updated successfully!',
                    'user' => $user
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        }
    }


    public function destroy()
    {
        // dd($request->id);
        try {
            $this->user->deleteUser(2);

             return response()->json(['status' => 'success', 'message' => 'User deleted successfully'], 200);
         } catch (DefaultException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], $e->getCode());
        }catch (\Exception $e) {
             return response()->json(['status' => 'error', 'message' => $e->getMessage()], 422);
         }
    }
}
