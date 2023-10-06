<?php

namespace App\Http\Controllers;

use App\Models\Professeurs;
use Illuminate\Http\Request;

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
}
