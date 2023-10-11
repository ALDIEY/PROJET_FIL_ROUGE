<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiants extends Model
{
    use HasFactory;
    protected $fillable=['nom','prenom','telephone','email','date_naissance'];
   public function inscription(){
return $this->hasMany(Inscriptions::class,'etudiants_id');
}
}
