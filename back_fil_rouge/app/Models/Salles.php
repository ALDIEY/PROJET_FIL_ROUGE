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
    public function sessions()
    {
        return $this->hasMany(Sessions::class, 'salles_id'); // Assurez-vous d'ajuster le nom de la clé étrangère si nécessaire
    }
}

