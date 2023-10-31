<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourRequest;
use App\Http\Resources\CourResource;
use App\Http\Resources\CoursclasseResource;
use App\Models\CourClasses;
use App\Models\Cours;
use App\Models\Inscriptions;
use App\Models\Modules;
use App\Models\Professeurs;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Illuminate\Support\Facades\Auth;


class CourController extends Controller
{
    //
    public function getCoursNonTermines()
    {
        $coursNonTermines = Cours::where('nbr_heure', '!=', '00:00:00')->get();
        return CourResource::collection($coursNonTermines);
    }
    

    public function getCoursTermines()
    {
        $coursTermines = Cours::where('nbr_heure', '00:00:00')->get();
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
    // Récupérer les données de la requête
    $modulesId = $request->input('modules_id');
    $professeursId = $request->input('professeurs_id');
    $semestresId = $request->input('semestres_id');
    $nbrHeure = $request->input('nbr_heure');

    // Vérifier s'il existe déjà un cours avec le même module, professeur, semestre et durée
    $existingCours = Cours::where('modules_id', $modulesId)
                          ->where('professeurs_id', $professeursId)
                          ->where('semestres_id', $semestresId)
                          ->first();

    if ($existingCours) {
        return response()->json(['message' => 'Un cours avec le même module, professeur, semestre  existe déjà.']);
    }

    // Créer un nouveau cours
    $cours = Cours::create([
        'modules_id' => $modulesId,
        'semestres_id' => $semestresId,
        'professeurs_id' => $professeursId,
        'nbr_heure' => $nbrHeure,
    ]);

    // Attacher les classes au cours
    $cours->classes()->attach($request->input('classes'));

    return response()->json(['message' => 'Cours planifié avec succès']);
}
    public function getCourprof(){
        $professeur = Auth::user();
        $professeurcour=$professeur->professeur_id;
//    dd($professeurcour);
   $cour=Cours::where('professeurs_id',$professeurcour)->get();
return CourResource::collection($cour);
}
 
public function getCourprofbyModule($moduleId){
    // $responsable = Auth::user();
    // $responsablecour = $responsable->responsables_id;

    $cours = Cours::where('modules_id', $moduleId) 
                  ->get();
// dd()
    return CourResource::collection($cours);
}

public function getClassesByCours($id)
    {
        $cours = Cours::with('courClasses.classe')->find($id);
// dd($cours);
        if (!$cours) {
            return response()->json(['message' => 'Cours non trouvé.'], 404);
        }

        // Récupère les classes associées au cours
        $classes = $cours->courClasses->map(function ($courClasse) {
            return $courClasse->classe;
        });

        return response()->json($classes);
    }

 
}
