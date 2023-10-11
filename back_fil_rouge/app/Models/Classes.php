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
}
