<?php

namespace App\Models;

use App\Models\Route;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['title',
        'author',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}

