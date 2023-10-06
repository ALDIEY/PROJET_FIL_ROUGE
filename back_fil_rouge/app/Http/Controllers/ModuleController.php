<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    //
    public function index(){
    
    return Modules::all();
    }
    public function store(Request $request){
        $request->validate([
            'libelle' => 'required|string|max:255',
            // 'niveau_id' => 'required|exists:niveaux,id', // Assurez-vous que le niveau existe
        ]);
        $module=Modules::create([
            'libelle' => $request->input('libelle'),

        ]);
        return response()->json(['message' => 'module créée avec succès', 'classe' => $module], 201);

    }
}
