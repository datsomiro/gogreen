<?php

namespace App\Models;

use App\Models\Route;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    public function routes()
    {
        return $this->belongsToMany(Route::class);
    }
}
