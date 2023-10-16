<?php

namespace App\Http\Controllers;

use App\Http\Requests\InscriptionRequest;
use App\Http\Resources\InscriptionResource;
// use App\Http\Requests\InscriptionRequest\InscriptionRequest;
use Illuminate\Support\Facades\Log;

use App\Models\Annees;
use App\Models\Classes;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Etudiant;
use App\Models\Etudiants;
use App\Models\Inscriptions;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function index(){
    $etudiant=Inscriptions::all();
    return InscriptionResource::collection($etudiant);

    }
    public function store(Request $request)
{
    // $request->validate([
    //     'email' => 'required|unique:etudiants|email',

    // ]);
    $annee = Annees::where('statut', '1')->first();
    if ($annee) {
        $idAnnee = $annee->id;

        $etudiants = $request->input('doc'); 
    DB::beginTransaction();

    try {
        foreach ($etudiants as $etudiant) {
            $apprenant = Etudiants::where('telephone', $etudiant['telephone'])->first();
            // dd($apprenant->id);
            if ($apprenant == null) {
               
//  dd($etudiants);
               $newApprenant = Etudiants::create([
                    "nom" => $etudiant['nom'],
                    "prenom" => $etudiant['prenom'],
                    "date_naissance" => $etudiant['date_naissance'],
                    "telephone" => $etudiant['telephone'],
                    "email" => $etudiant['email'],
                ]);
// dd($newApprenant->id);
               $user= User::create([
                    "etudiant_id" => $newApprenant->id,
                    "login" => $etudiant['login'],
                    "role_id" =>3,
                    "password" => bcrypt($etudiant['password']),
                ]);
                // dd($newApprenant);

                $idClasse = Classes::where('libelle', $etudiant['classe'])->first()->id;
                // dd($idClasse);
               Inscriptions::create([
                    "classes_id" => $idClasse,
                    "etudiants_id" => $newApprenant->id,
                    "annees_id" => $idAnnee,
                    "date" => Carbon::now()
                    // "date"=>$date;
                ]);
            } else {
                $idClasse = Classes::where('libelle', $etudiant['classe'])->first()->id;
                Inscriptions::create([
                    "classes_id" => $idClasse,
                    "etudiants_id" => $apprenant->id,
                    "annees_id" => $idAnnee,
                    "date" => Carbon::now()

                ]);
            }
        }

        DB::commit();
        return response(['message' => 'Inscription réussie']);
    } catch (\Exception $e) {
        DB::rollback();
        Log::error($e);
        return response(['message' => $e->getMessage()], 500);
    }
        // Le reste de votre code ici...
    } else {
        // Gérer le cas où aucune année avec le statut 1 n'est trouvée
        return response(['message' => 'Aucune année avec le statut 1 trouvée.'], 404);
    }
        


}
}
// {
//     "inscriptions": [
//         {
//             "date": "2023-10-10",
//             "etudiant": {
//                 "nom": "Doe",
//                 "prenom": "John",
//                 "email": "john.doe@example.com"
//             },
//             "classe_id": 1,
//             "annee_id": 1
//         },
//         {
//             "date": "2023-10-11",
//             "etudiant": {
//                 "nom": "Smith",
//                 "prenom": "Alice",
//                 "email": "alice.smith@example.com"
//             },
//             "classe_id": 2,
//             "annee_id": 1
//         }
//     ]
// }
