<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $table = 'rates';

    protected $fillable = [
        'recipe_id',
        'email',
        'rate'
    ];

    public $timestamps = false;

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
