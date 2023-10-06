<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salles extends Model
{
    use HasFactory;

protected $fillable = [
        'nom',
        'numero',
        'nbr_places',
    ];
}
