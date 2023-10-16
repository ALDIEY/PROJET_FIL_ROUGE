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
use Illuminate\Support\Facades\Log;



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
        $coursId = $request->input('cours_id');
        $classeId = $request->input('classes_id');
        $mode = $request->input('mode');
        $date = $request->input('date');
        $salleId = $request->input('salles_id');
        $heureDebut = Carbon::createFromFormat('H:i:s', $request->input('heure_debut'));
        $heureFin = Carbon::createFromFormat('H:i:s', $request->input('heure_fin'));
    // ;
        // Vérifier la disponibilité du professeur, de la classe et de la salle
        if (!$this->isProfesseurDisponible($coursId, $date, $heureDebut, $heureFin)) {
            return response()->json(['message' => 'Le professeur n\'est pas disponible à ces heures.'], 400);
        }
        if (!$this->isClasseDisponible($classeId, $date, $heureDebut, $heureFin)) {
            return response()->json(['message' => 'La classe n\'est pas disponible à ces heures.'], 400);
        }
    
        if ($mode === 'en_presentiel') {
            if (!$this->isSalleDisponible($salleId, $date, $heureDebut, $heureFin)) {
                return response()->json(['message' => 'La salle n\'est pas disponible à ces heures.'], 400);
            }
        }

        // Calculer la durée de la session en minutes
        $dureeEnMinutes = $heureFin->diffInMinutes($heureDebut);
        $heures = floor($dureeEnMinutes / 60);
        $minutes = $dureeEnMinutes % 60;
    
        // Formater en "H:i:s"
        $dureeFormatee = gmdate("H:i:s", $heures * 3600 + $minutes * 60);
        // dd($classeId);

       
        $cours = Cours::findOrFail($coursId);
        $totalHeuresCours = $cours->nbr_heure;
    
 // Calculer la durée de la session en minutes
 $dureeEnMinutes = $heureFin->diffInMinutes($heureDebut);

 // Convertir la durée du cours de H:m:s en minutes
 $dureeCoursEnMinutes = Carbon::createFromFormat('H:i:s', $cours->nbr_heure)->diffInMinutes(Carbon::createFromFormat('H:i:s', '00:00:00'));
     // Vérifier si le nombre total d'heures du cours est suffisant pour la nouvelle session
        if ($dureeCoursEnMinutes >= $dureeEnMinutes) {
            $session = Sessions::create([
                'cours_id' => $coursId,
                'classes_id' => $classeId,
                'mode' => $mode,
                'salles_id' => $salleId,
                'heure_debut' => $heureDebut,
                'heure_fin' => $heureFin,
                'duree' => $dureeFormatee,
                'date' => $date
            ]);
            // Soustraire la durée de la session du nombre total d'heures du cours
            $totalMinutesRestantes = $dureeCoursEnMinutes - $dureeEnMinutes;
            $heures = floor($totalMinutesRestantes / 60);
            $minutes = $totalMinutesRestantes % 60;
            $cours->nbr_heure = gmdate("H:i:s", $heures * 3600 + $minutes * 60);
            $cours->save();
    
            // ... le reste de votre code pour créer la session ...
            
            return response()->json(['message' => 'Session créée avec succès', 'session' => $session], 201);
        } else {
            return response()->json(['message' => 'Le quota horaire du cours est dépassé.']);
        }
    }
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

    $sessions = Sessions::where('classes_id', $classeId)
        ->where('date', $date)
        ->get();

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

    // $courClasse = CourClasses::where('cours_id', $coursId)->first();
    // $courclasseId = $courClasse->id;

    $sessionsQuery = Sessions::where('cours_id',$coursId)->get();

    // if ($request->has('jour')) {
    //     $jour = $request->input('jour');
    //     $sessionsQuery->whereDate('date', '=', $jour);
    // }

    // // Filtrer par semaine (du lundi au dimanche)
    // if ($request->has('semaine')) {
    //     $semaine = $request->input('semaine');
    //     $premierJourSemaine = Carbon::now()->startOfWeek()->addWeeks($semaine)->toDateString();
    //     $dernierJourSemaine = Carbon::parse($premierJourSemaine)->endOfWeek()->toDateString();
    //     $sessionsQuery->whereBetween('date', [$premierJourSemaine, $dernierJourSemaine]);
    // }

    // $sessionprof = $sessionsQuery->get();

    return SessionResource::collection($sessionsQuery);
}

public function annulerSession($sessionId)
{
    try {
        if (!is_numeric($sessionId)) {
            return response()->json(['error' => 'ID de session invalide'], 400);
        }

        $session = Sessions::findOrFail($sessionId);

        if ($session->etat == 'annuler') {
            return response()->json(['message' => 'Session déjà annulée']);
        }

        $session->etat = 'annuler';
        $session->save();

        return response()->json(['message' => 'Session annulée avec succès']);
    } catch (\Exception $e) {
        Log::error($e);
        return response()->json(['error' => 'Erreur lors de l\'annulation de la session'], 500);
    }
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

