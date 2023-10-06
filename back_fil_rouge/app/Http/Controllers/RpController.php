<?php

namespace App\Http\Controllers;

use App\Models\Annees;
use Illuminate\Http\Request;

class RpController extends Controller
{
    private $anneeModel;

    public function __construct()
    {
        $this->anneeModel = new Annees();
    }
    //proffeseur
    public function creeAnnes(Request $request){
    
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $anneeScolaire = $_POST['annee_scolaire'];

            if (!preg_match('/^\d{4}-\d{4}$/', $anneeScolaire)) {
                $_SESSION['error'] = "Le format de l'année est incorrect.";                return;
            }

            $annees = explode('-', $anneeScolaire);
            $anneeDebut = intval($annees[0]);
            $anneeFin = intval($annees[1]);

            if ($anneeFin - $anneeDebut !== 1) {
                $_SESSION['error'] = "La différence entre les deux années doit être de 1 an.";
                return;
            }

            if ($this->anneeModel->insert($anneeScolaire)) {
                $_SESSION['success'] = "L'année scolaire a été ajoutée avec succès.";
            } else {
                $_SESSION['error'] = "Une erreur s'est produite lors de l'ajout de l'année scolaire.";
            }
        }
    }
    public function planifierCour(){
    
    
    }
}
