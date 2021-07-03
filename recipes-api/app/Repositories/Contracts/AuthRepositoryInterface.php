<?php

namespace App\Repositories\Contracts;

interface AuthRepositoryInterface 
{
    public function authenticate ($data);
}