<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourClasses extends Model
{
    use HasFactory;
    protected $table = 'cour_classes';
    public function cours()
    {
        return $this->belongsTo(Cours::class, 'cours_id');
    }

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }
   
}