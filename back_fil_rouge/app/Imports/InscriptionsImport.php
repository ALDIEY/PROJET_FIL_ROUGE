<?php

namespace App\Imports;

use App\Models\Inscriptions;
use Maatwebsite\Excel\Concerns\ToModel;
use Carbon\Carbon;

// class InscriptionsImport implements ToModel
// {
//     public function model(array $row)
//     {
//         return new Inscriptions([
//             'date' => Carbon::parse($row[0]), // Colonne pour la date dans votre fichier Excel
//             'etudiant_nom' => $row[1], // Colonne pour le nom de l'étudiant
//             'etudiant_prenom' => $row[2], // Colonne pour le prénom de l'étudiant
//             'etudiant_email' => $row[3], // Colonne pour l'email de l'étudiant
//             'classe_id' => $row[4], // Colonne pour l'ID de la classe
//             'annee_id' => $row[5], // Colonne pour l'ID de l'année
//         ]);
//     }
// }
