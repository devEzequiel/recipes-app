<?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface 
{
    public function find (int $id);
    public function createUser ($data);
    public function updateUser ($data);
    public function deleteUser ($id);
}