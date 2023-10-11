<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourRequest;
use App\Http\Resources\CourResource;
use App\Http\Resources\CoursclasseResource;
use App\Models\CourClasses;
use App\Models\Cours;
use App\Models\Professeurs;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Illuminate\Support\Facades\Auth;


class CourController extends Controller
{
    //
    public function getCoursEnCours()
    {
        $coursEnCours = Cours::where('etat', 'En Cours')->get();
        // dd($coursEnCours);
        return CourResource::collection($coursEnCours);
    }

    public function getCoursTermines()
    {
        $coursTermines = Cours::where('etat', 'terminé')->get();
        return CourResource::collection($coursTermines);
    }
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
    public function store(CourRequest $request)
    {
       

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
    public function getCourprof(){
        $professeur = Auth::user();
        $professeurcour=$professeur->professeur_id;
//    dd($professeurcour);
   $cour=Cours::where('professeurs_id',$professeurcour)->get();
return CourResource::collection($cour);
}

}
