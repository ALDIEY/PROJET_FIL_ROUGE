<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sessions extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'mode',
        'date',
        'heure_debut',
        'heure_fin',
        'duree',
        'etat',
        'cour_classes_id',
        'attaches_id',
        'responsables_id',
        'salles_id',
    ];
    public function cours()
    {
    return $this->belongsTo(CourClasses::class);
    }
}
