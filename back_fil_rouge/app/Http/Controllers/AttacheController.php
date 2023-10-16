<?php

namespace App\Http\Controllers;

use App\Http\Resources\DemandeResource;
use App\Models\Demandes;
use App\Models\Sessions;
use Illuminate\Http\Request;

class AttacheController extends Controller
{
    //
    public function getDemandesEnAttente()
{
    $demandes = Demandes::where('etat_demande', 'attente')
        ->join('sessions', 'demandes.sessions_id', '=', 'sessions.id')
        ->where('sessions.etat', 'attente')
        ->select('demandes.*')
        ->get();
return DemandeResource::collection($demandes);
    // return response()->json(['demandes' => $demandes]);
}

}
