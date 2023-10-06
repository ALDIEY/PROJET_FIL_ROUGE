<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscriptions extends Model
{
    use HasFactory;
    protected $fillable=['date','etudiants_id','annees_id','classes_id'];
    public function etudiant(){
    return $this->belongsTo(Etudiants::class);
    }
}
