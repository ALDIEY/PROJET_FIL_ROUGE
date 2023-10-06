<?php

namespace App\Http\Controllers;

use App\Models\Semestres;
use Illuminate\Http\Request;

class SemestreController extends Controller
{
    //
    public function index() {
        return Semestres::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'statut' => 'required|string|max:255',
            'annees_id' => 'required|exists:annees,id', // Assurez-vous que l'année existe
        ]);

        // Création du nouveau semestre
        $semestre = Semestres::create([
            'libelle' => $request->input('libelle'),
            'statut' => $request->input('statut'),
            'annees_id' => $request->input('annees_id'),
        ]);

        return response()->json(['message' => 'Semestre ajouté avec succès', 'semestre' => $semestre], 201);
    }
}
