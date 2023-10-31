<?php

namespace App\Http\Controllers;

use App\Http\Requests\DemandeRequest;
use App\Http\Requests\ProfesseurRequest;
use App\Http\Resources\CourResource;
use App\Models\Cours;
use App\Models\Demandes;
use App\Models\Professeurs;
use App\Models\Sessions;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;


class ProfesseurController extends Controller
{
    //
    public function index() {
        return Professeurs::all();
    }
    public function store(ProfesseurRequest $request)
    {
        try {
            
    
            // Création du professeur
            $professeur = Professeurs::create([
                'name' => $request->input('name'),
                'grade' => $request->input('grade'),
                'email' => $request->input('email'),
                'specialite' => $request->input('specialite'),
            ]);
    
            // Création de l'utilisateur
            $user = User::create([
                'password' => bcrypt($request->input('password')),
                'login' => $request->input('login'),
                'roles_id' => 2
            ]);
    
            // Associer le professeur à l'utilisateur
            // $professeur->user_id = $user->id;
            // $professeur->save();
    
            return response()->json(['message' => 'Professeur ajouté avec succès', 'professeur' => $professeur]);
        } catch (QueryException $e) {
            // Une exception de requête s'est produite (par exemple, violation de la contrainte d'unicité)
            return response()->json(['error' => 'Erreur de base de données: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Une autre exception s'est produite
            return response()->json(['error' => 'Une erreur est survenue: ' . $e->getMessage()], 500);
        }
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

public function demandeAnnulation(DemandeRequest $request)
{
    $user = Auth::user();
    $professeurId = $user->professeur_id;
    $sessionsId = $request->input('sessions_id');

    $session = Sessions::find($sessionsId);
    $existingDemande = Demandes::where('professeurs_id', $professeurId)
    ->where('sessions_id', $sessionsId)
    ->first();

if ($existingDemande) {
return response()->json(['message' => 'Une demande d\'annulation pour cette session a déjà été soumise.']);
}

    // Vérifier si la session existe et si elle n'est ni annulée ni validée
    if (!$session || $session->etat === 'annuler' || $session->etat === 'valider') {
        return response()->json(['message' => 'Cette session est déjà annulée ou validée.']);
    }

    $now = now(); 
    if ($session->date < $now) {
        return response()->json(['message' => 'Cette session a déjà eu lieu.']);
    }
   
    // Créer la demande d'annulation
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

 public function demandeAnnuler($demandeId){

    try {
        if (!is_numeric($demandeId)) {
            return response()->json(['error' => 'ID de demande invalide'], 400);
        }

        $session = Demandes::findOrFail($demandeId);

        if ($session->etat == 'valider') {
            return response()->json(['message' => 'Demande déjà valider']);
        }

        $session->etat = 'annuler';
        $session->save();

        return response()->json(['message' => 'Demande annuler avec succès']);
    } catch (\Exception $e) {
        Log::error($e);
        return response()->json(['error' => 'Erreur lors de l\'annulation de la demande'], 500);
    }
}
public function demandeValider($demandeId)
{
    try {
        if (!is_numeric($demandeId)) {
            return response()->json(['error' => 'ID de demande invalide'], 400);
        }

        $demande = Demandes::findOrFail($demandeId);

        if ($demande->etat == 'valider') {
            return response()->json(['message' => 'demande déjà validée']);
        }

        $session = Sessions::find($demande->sessions_id);
        if ($session) {
            $session->etat = 'annuler';
            $session->save();
        } else {
            return response()->json(['error' => 'Session non trouvée'], 404);
        }

        $demande->etat = 'valider';
        $demande->save();

        return response()->json(['message' => 'Demande validée avec succès']);
    } catch (\Exception $e) {
        Log::error($e);
        return response()->json(['error' => 'Erreur lors de la validation de la demande'], 500);
    }
}
public function getCourprofbyModule($moduleId){
     $professeur = Auth::user();
     $professeurcour = $professeur->professeur_id;

    $cours = Cours::where('professeurs_id',$professeurcour)
            ->where('modules_id', $moduleId) 
                  ->get();
// dd()
    return CourResource::collection($cours);
}

}


