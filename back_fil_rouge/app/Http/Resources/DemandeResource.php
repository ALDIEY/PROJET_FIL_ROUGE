<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DemandeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'professeurs_id' => $this->professeurs_id,
            'sessions_id' => $this->sessions_id,
            'motif' => $this->motif,
            'etat_demande' => $this->etat_demande,
            'session' => new SessionResource($this->session),
            // Ajoutez d'autres champs de demande si nécessaire
        ];
    }
}
