<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\CourClasses;
use App\Models\Cours;
use App\Models\Etudiants;
use App\Models\Inscriptions;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    //
    public function getEtudiantCour($coursId) {
        $cours = Cours::findOrFail($coursId);
        $classesAssociees = $cours->classes; // Assurez-vous que votre modèle Cours a une relation avec les classes
        $classesAssocieesId=$classesAssociees;
    // dd($classesAssociees);
        $etudiants = collect();
    //  dd($etudiants);
        foreach ($classesAssociees as $classe) {
            $etudiantsDeCetteClasse = $classe->etudiants;
            $etudiants = $etudiants->merge($etudiantsDeCetteClasse);
            // dd($etudiants);
        }
    
        return response()->json($etudiants);
    } 

    public function getEtudiantsByCours($coursId)
{
    $cours = Cours::findOrFail($coursId);
    $etudiants = $cours->classes->flatMap(function($classe) {
        return $classe->etudiants;
    });

    return response()->json($etudiants);
}
public function getEtudiantsByClasse($classeId)
{
    $etudiants = Inscriptions::where('classes_id', $classeId)->get();

    return response()->json(['etudiants' => $etudiants]);
}
}
