<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index(){
    return Classes::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'filieres_id' => 'required|exists:filieres,id', // Assurez-vous que la filière existe
            // 'niveau_id' => 'required|exists:niveaux,id', // Assurez-vous que le niveau existe
        ]);

        // Création de la nouvelle classe
        $classe = Classes::create([
            'libelle' => $request->input('libelle'),
            'filieres_id' => $request->input('filieres_id'),
            'niveau_id' => $request->input('niveau_id'),
        ]);
// dd($classe);
        return response()->json(['message' => 'Classe créée avec succès', 'classe' => $classe], 201);
    }
    //
}
