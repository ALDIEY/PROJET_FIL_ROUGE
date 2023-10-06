<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Models\Salles;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    // ... autres méthodes du contrôleur ...
public function index(){
    return Salles::all();
}
    public function store(Request $request)
    {

        $request->validate([
            'nom' => 'required|string|max:255',
            'numero' => 'required|integer',
            'nbr_places' => 'required|integer',
        ]);

        // Création de la nouvelle salle
        $salle = Salles::create([
            'nom' => $request->input('nom'),
            'numero' => $request->input('numero'),
            'nbr_places' => $request->input('nbr_places'),
        ]);

        return response()->json(['message' => 'Salle ajoutée avec succès', 'salle' => $salle], 201);
    }
}
