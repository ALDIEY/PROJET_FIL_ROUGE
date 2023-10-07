<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourResource;
use App\Http\Resources\CoursclasseResource;
use App\Models\CourClasses;
use App\Models\Cours;
use Illuminate\Http\Request;

class CourController extends Controller
{
    //
    public function show($id)
{
    $cours = Cours::findOrFail($id);
    return new CourResource($cours);
}
public function getCourclasse(){
    $courclasse=CourClasses::all();
    return CoursclasseResource::collection($courclasse);

    
}

    public function index(){
    $cours= Cours::all();
    return CourResource::collection($cours);
    }
    public function store(Request $request)
    {
        $request->validate([
            'modules_id' => 'required|exists:modules,id',
            'semestres_id' => 'required|exists:semestres,id',
            'professeurs_id' => 'required|exists:professeurs,id',
            'nbr_heure' => 'required|integer',
            'classes' => 'required|array'
        ]);
        

        $cours = Cours::create([
            'modules_id' => $request->input('modules_id'),
            'semestres_id' => $request->input('semestres_id'),
            'professeurs_id' => $request->input('professeurs_id'),
            'nbr_heure' => $request->input('nbr_heure'),
            
        ]);
        // dd($cours);
        $cours->classes()->attach($request->input('classes'));
        
        return response()->json(['message' => 'Cours planifié avec succès', 'cours' => $cours], 201);
    }
}
