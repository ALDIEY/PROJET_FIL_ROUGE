<?php

namespace App\Http\Controllers;

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

}
