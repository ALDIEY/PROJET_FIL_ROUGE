<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSessionRequest;
use App\Models\Cours;
use App\Models\Salles;
use App\Models\Sessions;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    //
    public function getSessionsByDate($date)
{
    $sessions = Sessions::where('date', $date)->get();
    return response()->json($sessions);
}

    public function index(){
        $session=Sessions::all();
    }
    public function store(CreateSessionRequest $request)
{
    // dd($request->all());
    
    // Récupérer les données de la requête
    // $data = $request->validated();
    // dd($data);
    // $data=[]
    $coursId = $request->input('cours_id');
    $mode=$request->input('mode');
    $date = $request->input('date');
      $salleId=$request->input('salles_id');
    $heureDebut = Carbon::createFromFormat('H:i:s', $request->heure_debut);
    $heureFin = Carbon::createFromFormat('H:i:s', $request->heure_fin);
// dd($heureDebut);
    // Calculer la durée de la session en minutes
    $dureeEnMinutes = $heureFin->diffInMinutes($heureDebut);
    $heures = floor($dureeEnMinutes / 60);
    $minutes = $dureeEnMinutes % 60;
    
    // Formater en "H:m:s"
    $dureeFormatee = gmdate("H:i:s", $heures * 3600 + $minutes * 60);// dd($coursId);
    if (!$this->isProfesseurDisponible($coursId, $date, $heureDebut, $heureFin)) {
        return response()->json(['message' => 'Le professeur n\'est pas disponible à ces heures.'], 400);
    }

    // // Vérifier la disponibilité de la salle (si la session est en présentiel)
    // if ($data['mode'] === 'présentiel') {
    //     // Logique pour vérifier la disponibilité de la salle ici
    //     // Si la salle n'est pas disponible, renvoyer une réponse d'erreur
    //     if (!$this->isSalleDisponible($request->$salleId, $request->date, $request->heure_debut, $request->heure_fin)) {
    //         return response()->json(['message' => 'La salle n\'est pas disponible à ces heures.'], 400);
    //     }
    // }

    // // Vérifier le quota horaire global pour le cours associé
    // $cours = Cours::findOrFail($data['cours_id']);
    // $totalHeuresPlanifiees = $cours->sessions->sum('duree') + $data['duree'];

    // if ($totalHeuresPlanifiees > $cours->quota_horaire) {
    //     return response()->json(['error' => 'Le quota horaire du cours est dépassé.'], 422);
    // }

    $session = Sessions::create([
    
    'cours_id'=>$coursId,
    'mode'=>$mode,
    'salles_id'=>$salleId,
    'heure_debut'=>$heureDebut,
    'heure_fin'=>$heureFin,
    'duree'=>$dureeFormatee,
    'date'=>$date
    ]);

    return response()->json(['message' => 'Session créée avec succès', 'session' => $session], 201);
}
public function isSalleDisponible($salleId, $date, $heureDebut, $heureFin)
{
    // Récupérer toutes les sessions pour la salle spécifiée à la date donnée
    $sessions = Sessions::where('salles_id', $salleId)
        ->where('date', $date)
        ->get();

    // Vérifier s'il y a des conflits d'horaires avec les sessions existantes
    foreach ($sessions as $session) {
        // Vérifier si l'heure de début ou l'heure de fin de la nouvelle session chevauche une session existante
        if (($heureDebut >= $session->heure_debut && $heureDebut < $session->heure_fin) ||
            ($heureFin > $session->heure_debut && $heureFin <= $session->heure_fin) ||
            ($heureDebut <= $session->heure_debut && $heureFin >= $session->heure_fin)) {
            return false; // Il y a un conflit d'horaire
        }
    }

    return true; // La salle est disponible à l'heure spécifiée
}
public function isProfesseurDisponible($coursId, $date, $heureDebut, $heureFin)
    {
        $conflicts = Sessions::where('cours_id', $coursId)
            ->where('date', $date)
            ->where(function ($query) use ($heureDebut, $heureFin) {
                $query->where(function ($subquery) use ($heureDebut, $heureFin) {
                    $subquery->where('heure_debut', '>=', $heureDebut)
                        ->where('heure_debut', '<', $heureFin);
                })->orWhere(function ($subquery) use ($heureDebut, $heureFin) {
                    $subquery->where('heure_fin', '>', $heureDebut)
                        ->where('heure_fin', '<=', $heureFin);
                });
            })
            ->exists();

        // Si des conflits sont trouvés, le professeur n'est pas disponible à ces heures
        return !$conflicts;
    }

}

