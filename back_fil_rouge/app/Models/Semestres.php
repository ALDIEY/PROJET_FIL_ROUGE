<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semestres extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'statut',
        'annees_id',
    ];
}
