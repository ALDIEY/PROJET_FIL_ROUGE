<?php

namespace App\Http\Controllers;

use App\Http\Requests\DemandeRequest;
use App\Models\Cours;
use App\Models\Demandes;
use App\Models\Professeurs;
use App\Models\Sessions;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProfesseurController extends Controller
{
    //
    public function index() {
        return Professeurs::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        // Création du nouveau professeur
        $professeur = Professeurs::create([
            'name' => $request->input('name'),
            'grade' => $request->input('grade'),
            'specialite' => $request->input('specialite'),
        ]);

        return response()->json(['message' => 'Professeur ajouté avec succès', 'professeur' => $professeur], 201);
    }
    public function viewProfesseurData(Professeurs $professeur)
    {
        $this->authorize('view', $professeur);
        // Code pour récupérer et retourner les données des professeurs
    }

    public function createProfesseur(Request $request)
    {
        $this->authorize('create', Professeur::class);
        // Code pour créer un nouveau professeur
    }
    public function getNombreHeuresCoursProf(Request $request)
{
    $user = Auth::user();
    $professeurId = $user->professeur_id;
    $mois = Carbon::now()->month;

    // Filtrer par module si le paramètre est présent
    $module = $request->input('module');

    $query = Sessions::whereHas('courClasse.cours', function ($query) use ($professeurId, $module) {
        $query->where('professeurs_id', $professeurId);
        if ($module) {
            $query->where('module', $module);
        }
    })->whereMonth('date', $mois);

    $nombreHeures = $query->sum('duree'); // Supposons que 'duree' est le champ représentant la durée des sessions.

    return response()->json(['nombre_heures' => $nombreHeures]);
}

public function demandeAnnulation(DemandeRequest $request){
    $user = Auth::user();
    $professeurId = $user->professeur_id;
    $sessionsId = $request->input('sessions_id');

    $session = Sessions::find($sessionsId);
    if (!$session || $session->etat === 'annuler' ) {
        return response()->json(['message'=>'Cette session est déjà annulée.']);
    }
    if (!$session || $session->etat === 'valider' ) {
        return response()->json(['message'=>'Cette session est déjà valider.']);
    }

    Demandes::create([
        'professeurs_id' => $professeurId,
        'sessions_id' => $sessionsId,
        'motif' => $request->input('motif'),
        'etat_demande' => 'attente', 
    ]);

    return response()->json(['message' => 'Demande annulation soumise avec succès']);
}

public function NbrHeure() {
    $user = Auth::user();
    $professeurId = $user->professeur_id;
    
    $cours = Cours::where('professeurs_id', $professeurId)->get();
    $totalHeures = 0;
    
    foreach($cours as $cours) {
        $sessions = Sessions::where('cours_id', $cours->id)
            ->whereMonth('date', '=', now()->month)
            ->whereYear('date', '=', now()->year)
            ->where('etat', '!=', 'annule')
            ->get();

        foreach ($sessions as $session) {
            $heureDebut = Carbon::parse($session->heure_debut);
            $heureFin = Carbon::parse($session->heure_fin);
            $dureeEnMinutes = $heureFin->diffInMinutes($heureDebut);
            $totalHeures += $dureeEnMinutes / 60; 
        }
    }
    
    return response()->json($totalHeures);
}

public function NbrHeureModule(Request $request) {
    // $month = $request->input('month');
        $moduleId = $request->input('moduleId');
    $user = Auth::user();
    $professeurId = $user->professeur_id;
    
    $coursQuery = Cours::where('professeurs_id', $professeurId);
    
    // Filtrer par module si l'ID du module est spécifié
    if ($moduleId) {
        $coursQuery->where('module_id', $moduleId);
    }
    
    $cours = $coursQuery->get();
    $totalHeures = 0;
    
    foreach($cours as $cours) {
        $sessions = Sessions::where('cours_id', $cours->id)
            ->whereMonth('date', '=', now()->month)
            ->whereYear('date', '=', now()->year)
            ->where('etat', '!=', 'annule')
            ->get();

        foreach ($sessions as $session) {
            $heureDebut = Carbon::parse($session->heure_debut);
            $heureFin = Carbon::parse($session->heure_fin);
            $dureeEnMinutes = $heureFin->diffInMinutes($heureDebut);
            $totalHeures += $dureeEnMinutes / 60; 
        }
    }
    
    return response()->json(['totalHeures' => $totalHeures]);
}
}


