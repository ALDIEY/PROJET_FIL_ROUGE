<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demandes extends Model
{
    use HasFactory;
    protected $fillable=['motif','professeurs_id','sessions_id'];
   public function session() {
        return $this->belongsTo(Sessions::class,'sessions_id');
    }
    
    public function professeur() {
        return $this->belongsTo(Sessions::class,'professeurs_id');
    }
}
