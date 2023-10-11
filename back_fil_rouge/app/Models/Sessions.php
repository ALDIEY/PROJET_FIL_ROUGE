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
    public function classe()
    {
    return $this->belongsTo(CourClasses::class);
    }
    public function salle()
    {
        return $this->belongsTo(Salles::class, 'salles_id'); // Assurez-vous d'ajuster le nom de la clé étrangère si nécessaire
    }
    public function courClasse()
    {
        return $this->belongsTo(CourClasses::class, 'cour_classes_id');
    }
}
