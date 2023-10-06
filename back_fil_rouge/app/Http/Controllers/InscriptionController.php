<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Etudiants;
use App\Models\Inscription;
use App\Models\Inscriptions;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'inscriptions' => 'required|array',
            'inscriptions.*.date' => 'required|date',
            'inscriptions.*.etudiant.nom' => 'required|string',
            'inscriptions.*.etudiant.prenom' => 'required|string',
            'inscriptions.*.etudiant.email' => 'required|email|unique:etudiants,email',
            'inscriptions.*.classe_id' => 'required|exists:classes,id',
            'inscriptions.*.annee_id' => 'required|exists:annees,id',
        ]);

        $inscriptionsData = $request->input('inscriptions');

        foreach ($inscriptionsData as $inscriptionData) {
            $etudiant = Etudiants::create([
                'nom' => $inscriptionData['etudiant']['nom'],
                'prenom' => $inscriptionData['etudiant']['prenom'],
                'email' => $inscriptionData['etudiant']['email'],
            ]);

            $inscription = new Inscriptions([
                'date' => $inscriptionData['date'],
                'etudiant_id' => $etudiant->id,
                'classe_id' => $inscriptionData['classe_id'],
                'annee_id' => $inscriptionData['annee_id'],
            ]);

            $inscription->save();
        }

        return response()->json(['message' => 'Inscriptions des étudiants ajoutées avec succès'], 200);
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
