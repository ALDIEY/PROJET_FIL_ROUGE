<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeurs extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'grade',
        'specialite',
        'email'
    ];
    public function cours(){
    
    return $this->hasMany(Cours::class);
    }
}
