<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;

use App\Models\Classes;
use App\Models\Filieres;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index(){
    return Classes::all();
    }
    public function getClassesPlanifiees() {
        $classesPlanifiees = Classes::where('planifier', 1)->get();
        return response()->json($classesPlanifiees);
    }
    public function getClassesNonPlanifiees() {
        $classesNonPlanifiees = Classes::where('planifier', 0)->get();
        return response()->json($classesNonPlanifiees);
    } 
    public function getFiliere(){
        return Filieres::all();
    }
    public function planifierClasses(Request $request)
{
    $request->validate([
        'classes' => 'required|array', // Assurez-vous que classes_ids est un tableau
        'classes.*' => 'numeric|exists:classes,id', // Assurez-vous que chaque ID de classe existe dans la table des classes
    ]);
    // Récupérez les IDs des classes à planifier depuis la requête et décodez-les du format JSON
    $classesIds =$request->input('classes');

// dd($classesIds);
    // Assurez-vous que les IDs sont un tableau valide
    

    try {
        Classes::whereIn('id', $classesIds)->update(['planifier' => 1]);

        return response()->json(['message' => 'Classes planifiées avec succès.']);
    } catch (\Exception $e) {
        // Enregistrez l'erreur dans les logs
        Log::error($e);
        return response()->json(['message' => 'Erreur lors de la planification des classes.'], 500);
    }
}




    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'filieres_id' => 'required|exists:filieres,id', // Assurez-vous que la filière existe
            // 'niveau_id' => 'required|exists:niveaux,id', // Assurez-vous que le niveau existe
        ]);

        // Création de la nouvelle classe
        $libelle=$request->input('libelle');
        $filiere=$request->input('filieres_id');
        $filierex=Classes::where(['filieres_id'=>$filiere,'libelle'=>$libelle])->first();
        // dd($filierex);
        if (!$filierex) {
            $classe = Classes::create([
                'libelle' => $libelle,
                'filieres_id' => $filiere,
                'niveau_id' => $request->input('niveau_id'),
            ]);
    // dd($classe);
            return response()->json(['message' => 'Classe créée avec succès', 'classe' => $classe], 201);            # code...
        }
        else{
        return false;
        }
    }
    //
}
