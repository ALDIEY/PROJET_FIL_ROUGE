<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSessionRequest;
use App\Http\Resources\SessionResource;
use App\Models\CourClasses;
use App\Models\Cours;
use App\Models\Salles;
use App\Models\Sessions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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
        return SessionResource::collection($session);
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
 $classeId = $courClasse->classes_id;

// dd($classeId);

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
    if (!$this->isClasseDisponible($classeId, $date, $heureDebut, $heureFin)) {
        return response()->json(['message' => 'La classe n\'est pas disponible à ces heures.'], 400);
    }
    // dd('gsf');
    // // Vérifier la disponibilité de la salle (si la session est en présentiel)
    if ($mode=== 'en_presentiel') {
        // dd($salleId);
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
    // Formatez les heures au format de votre base de données (H:i:s)
    $heureDebut = Carbon::parse($heureDebut)->format('H:i:s');
    $heureFin = Carbon::parse($heureFin)->format('H:i:s');

    // Récupérez les sessions existantes pour la salle à la date donnée
    $sessions = Sessions::where('salles_id', $salleId)
        ->where('date', $date)
        ->get();

    foreach ($sessions as $session) {
        $sessionHeureDebut = Carbon::parse($session->heure_debut)->format('H:i:s');
        $sessionHeureFin = Carbon::parse($session->heure_fin)->format('H:i:s');

        // Vérifiez si les heures se chevauchent
        if (
            ($heureDebut >= $sessionHeureDebut && $heureDebut < $sessionHeureFin) ||
            ($heureFin > $sessionHeureDebut && $heureFin <= $sessionHeureFin) ||
            ($heureDebut <= $sessionHeureDebut && $heureFin >= $sessionHeureFin)
        ) {
            return false;
        }
    }

    return true;
}
    
public function isClasseDisponible($classeId, $date, $heureDebut, $heureFin)
{
    $heureDebut = Carbon::parse($heureDebut)->format('H:i:s');
    $heureFin = Carbon::parse($heureFin)->format('H:i:s');

    $sessions = Sessions::whereHas('courClasse', function ($query) use ($classeId) {
        $query->where('classes_id', $classeId);
    })->where('date', $date)->get();
// dd($sessions);
    foreach ($sessions as $session) {
        $sessionHeureDebut = Carbon::parse($session->heure_debut)->format('H:i:s');
        $sessionHeureFin = Carbon::parse($session->heure_fin)->format('H:i:s');

        if (
            ($heureDebut >= $sessionHeureDebut && $heureDebut < $sessionHeureFin) ||
            ($heureFin > $sessionHeureDebut && $heureFin <= $sessionHeureFin) ||
            ($heureDebut <= $sessionHeureDebut && $heureFin >= $sessionHeureFin)
        ) {
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

    return !$conflicts;
}
// public function getSessionProf(){
//     $user=Auth::user();
//     $professeurcour=$user->professeur_id;
//     $cours=Cours::where('professeurs_id',$professeurcour)->first();
// $coursId=$cours->id;

// $courClasse=CourClasses::where('cours_id',$coursId)->first();
// // dd($courClasse);
// $courclasseId=$courClasse->id;

// $sessionprof=Sessions::where('cour_classes_id',$courclasseId)->get();
//     // $coursId=$cours->id;
// return SessionResource::collection($sessionprof);
//     // dd($sessionprof);
//     }
    public function heureglobal(){
        
    }
    public function getSessionProf(Request $request)
{
    $user = Auth::user();
    $professeurcour = $user->professeur_id;
    // dd($professeurcour);
    $cours = Cours::where('professeurs_id', $professeurcour)->first();
    $coursId = $cours->id;

    $courClasse = CourClasses::where('cours_id', $coursId)->first();
    $courclasseId = $courClasse->id;

    $sessionsQuery = Sessions::where('cour_classes_id', $courclasseId);

    if ($request->has('jour')) {
        $jour = $request->input('jour');
        $sessionsQuery->whereDate('date', '=', $jour);
    }

    // Filtrer par semaine (du lundi au dimanche)
    if ($request->has('semaine')) {
        $semaine = $request->input('semaine');
        $premierJourSemaine = Carbon::now()->startOfWeek()->addWeeks($semaine)->toDateString();
        $dernierJourSemaine = Carbon::parse($premierJourSemaine)->endOfWeek()->toDateString();
        $sessionsQuery->whereBetween('date', [$premierJourSemaine, $dernierJourSemaine]);
    }

    $sessionprof = $sessionsQuery->get();

    return SessionResource::collection($sessionprof);
}

// public function getSessionsByWeek($semaine)
// {
   
//     $dateDebut = Carbon::now()->startOfWeek()->addWeeks($semaine - 1)->toDateString();
//     $dateFin = Carbon::now()->endOfWeek()->addWeeks($semaine - 1)->toDateString();

//     // Récupérez les sessions de la base de données en fonction des dates de début et de fin
//     $sessions = Sessions::whereBetween('date', [$dateDebut, $dateFin])->get();

//     return SessionResource::collection($sessions);
// }

}

