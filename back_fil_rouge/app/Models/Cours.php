<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;
    protected $fillable = [
        'modules_id',
        'semestres_id',
        'professeurs_id',
        'classes_id',
        'nbr_heure',
    ];
    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'cour_classes', 'cours_id', 'classes_id');
    }

    public function professeurs()
{
    return $this->belongsTo(Professeurs::class, 'professeurs_id');
}
public function module()
{
    return $this->belongsTo(Modules::class, 'modules_id');
}
public function semestre()
{
    return $this->belongsTo(Semestres::class, 'semestres_id');
}
}
