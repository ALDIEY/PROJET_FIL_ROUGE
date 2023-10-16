<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiants extends Model
{
    use HasFactory;
    protected $fillable=['nom','prenom','telephone','email','date_naissance'];
    public function inscriptions()
    {
        return $this->hasMany(Inscriptions::class, 'etudiants_id');
    }
    public function cours()
    {
        // Relation indirecte via la table coursClasse
        return $this->belongsToMany(Cours::class, 'coursClasse', 'classes_id', 'cours_id')
            ->using(CourClasses::class)
            ->withPivot('cours_id', 'classes_id');
    }
    
}
