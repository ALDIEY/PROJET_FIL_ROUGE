<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

   protected $fillable=['libelle','filieres_id'];
   public function inscription(){
    return $this->hasMany(Inscriptions::class,'classes_id');
    }
    public function etudiants()
    {
        return $this->belongsToMany(Etudiants::class, 'inscriptions', 'classes_id', 'etudiants_id');
    }
    
    public function sessions()
    {
        return $this->hasMany(Sessions::class, 'classes_id'); // Assurez-vous d'ajuster le nom de la clé étrangère si nécessaire
    }
}
