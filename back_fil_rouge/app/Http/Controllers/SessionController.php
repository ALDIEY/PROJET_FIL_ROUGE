<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSessionRequest;
use App\Models\CourClasses;
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
    $coursclasseId = $request->input('cour_classes_id');
    $courClasse = CourClasses::find($coursclasseId);
 $coursId = $courClasse->cours_id;
    // dd($coursId);

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
    // dd('gsf');
    // // Vérifier la disponibilité de la salle (si la session est en présentiel)
    if ($mode=== 'en_presentiel') {
        // Logique pour vérifier la disponibilité de la salle ici
        // Si la salle n'est pas disponible, renvoyer une réponse d'erreur
        if (!$this->isSalleDisponible($salleId, $date, $heureDebut, $heureFin)) {
            return response()->json(['message' => 'La salle n\'est pas disponible à ces heures.'], 400);
        }
    }
    // dd($dureeEnMinutes);
// dd('gsf');
    $cours = Cours::findOrFail($coursId);
    $heureMinuteSeconde = explode(":", $cours->nbr_heure);
    $quotaHoraireEnMinutes = ($heureMinuteSeconde[0] * 60) + $heureMinuteSeconde[1] + ($heureMinuteSeconde[2] / 60);
    // dd($quotaHoraireEnMinutes);
    // Vérifier si le quota horaire du cours permet de créer cette session
    $quotaHoraireRestant = $quotaHoraireEnMinutes - $dureeEnMinutes;
    $heures = floor($quotaHoraireRestant / 60); // Nombre d'heures
    $minutes = $quotaHoraireRestant % 60; // Le reste est le nombre de minutes
    
    // Formater en H:m:s
    $quotaHoraireRestantAuFormat = sprintf('%02d:%02d:00', $heures, $minutes);
    
    // // Vérifier le quota horaire global pour le cours associé
    // $cours = Cours::findOrFail($data['cours_id']);
    // $totalHeuresPlanifiees = $cours->sessions->sum('duree') + $data['duree'];

    // if ($totalHeuresPlanifiees > $cours->quota_horaire) {
    //     return response()->json(['error' => 'Le quota horaire du cours est dépassé.'], 422);
    // }

    if ($quotaHoraireRestant >= 0) {
        // Créer la session
        $session = Sessions::create([
            'cour_classes_id' => $coursclasseId,
            'mode' => $mode,
            'salles_id' => $salleId,
            'heure_debut' => $heureDebut,
            'heure_fin' => $heureFin,
            'duree' => $dureeFormatee,
            'date' => $date
        ]);
    
        $cours->nbr_heure = $quotaHoraireRestantAuFormat;
        $cours->save();
    
        return response()->json(['message' => 'Session créée avec succès', 'session' => $session], 201);
    } else {
        return response()->json(['message' => 'Le quota horaire du cours est dépassé.'], 422);
    }}
public function isSalleDisponible($salleId, $date, $heureDebut, $heureFin)
{
    $sessions = Sessions::where('salles_id', $salleId)
        ->where('date', $date)
        ->get();
// dd($sessions);
    foreach ($sessions as $session) {
        if (($heureDebut >= $session->heure_debut && $heureDebut < $session->heure_fin) ||
            ($heureFin > $session->heure_debut && $heureFin <= $session->heure_fin) ||
            ($heureDebut <= $session->heure_debut && $heureFin >= $session->heure_fin)) {
            return false;
        }
    }

    return true;
}
public function isProfesseurDisponible($courClassesId, $date, $heureDebut, $heureFin)
{
    $conflicts = Sessions::join('cour_classes', 'sessions.cour_classes_id', '=', 'cour_classes.id')
        ->join('cours', 'cour_classes.cours_id', '=', 'cours.id')
        ->where('cour_classes.id', $courClassesId)
        ->where('sessions.date', $date)
        ->where(function ($query) use ($heureDebut, $heureFin) {
            $query->where(function ($subquery) use ($heureDebut, $heureFin) {
                $subquery->where('sessions.heure_debut', '>=', $heureDebut)
                    ->where('sessions.heure_debut', '<', $heureFin);
            })->orWhere(function ($subquery) use ($heureDebut, $heureFin) {
                $subquery->where('sessions.heure_fin', '>', $heureDebut)
                    ->where('sessions.heure_fin', '<=', $heureFin);
            });
        })
        ->exists();

    // Si des conflits sont trouvés, le professeur n'est pas disponible à ces heures
    return !$conflicts;
}


}

