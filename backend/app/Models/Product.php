<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'desc',
        'price',
        'qte',
        'user_id'
    ];

    function user(){
        return $this->belongsTo(User::class);
    }
}
