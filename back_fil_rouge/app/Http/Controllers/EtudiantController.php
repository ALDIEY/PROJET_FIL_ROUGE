<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourEtudiantResource;
use App\Http\Resources\CourResource;
use App\Http\Resources\SessionResource;
use App\Models\Classes;
use App\Models\CourClasses;
use App\Models\Cours;
use App\Models\Etudiants;
use App\Models\Inscriptions;
use App\Models\Sessions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

public function getSessionsEtudiant($idUser)
{
    $etudiant = User::where('id', $idUser)->first();

    if (!$etudiant) {
        return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
    }

    $idEtudiant = $etudiant->etudiant_id;

    $classeId = Inscriptions::where('etudiants_id', $idEtudiant)->value('classes_id');

    $sessions = Sessions::where('classes_id', $classeId)->get();
   // return response()->json($sessions);

    return SessionResource::collection($sessions);
}

public function getCourEtudiant($idUser)
{
    $etudiant = User::where('id', $idUser)->first();

    if (!$etudiant) {
        return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
    }

    $idEtudiant = $etudiant->etudiant_id;
    $classeId = Inscriptions::where('etudiants_id', $idEtudiant)->value('classes_id');
    $courClassesIds = CourClasses::where('classes_id', $classeId)->pluck('cours_id');
    
    // Maintenant, $courClassesIds contient les ID des cours associés à l'étudiant

    $cours = Cours::whereIn('id', $courClassesIds)->get();

    // Maintenant, $cours contient les détails des cours associés à l'étudiant

    //return response()->json($cours);
    return CourEtudiantResource::collection($cours);
}

}
