<?php

namespace App\Http\Controllers;

use App\Models\Annees;
use Illuminate\Http\Request;

class AnneeController extends Controller
{
    //
    private $anneeModel;

    public function __construct()
    {
        $this->anneeModel = new Annees();
    }
    public function index() {
        return Annees::all();
    }
    public function creeAnnes(Request $request)
    {
        $anneeScolaire = $request->input('annee_scolaire');

        if (!preg_match('/^\d{4}-\d{4}$/', $anneeScolaire)) {
            return response()->json(['error' => "Le format de l'année est incorrect."], 400);
        }

        $annees = explode('-', $anneeScolaire);
        $anneeDebut = intval($annees[0]);
        $anneeFin = intval($annees[1]);

        if ($anneeFin - $anneeDebut !== 1) {
            return response()->json(['error' => "La différence entre les deux années doit être de 1 an."], 400);
        }

        $anneeExistante = $this->anneeModel->where('annee_scolaire', $anneeScolaire)->first();

        if ($anneeExistante) {
            return response()->json(['error' => "L'année scolaire existe déjà."], 400);
        }

        $nouvelleAnnee = $this->anneeModel->create([
            'annee_scolaire' => $anneeScolaire,
        ]);

        if ($nouvelleAnnee) {
            return response()->json(['success' => "L'année scolaire a été ajoutée avec succès.", 'annee_scolaire' => $nouvelleAnnee], 201);
        } else {
            return response()->json(['error' => "Une erreur s'est produite lors de l'ajout de l'année scolaire."], 500);
        }
    }
    }

