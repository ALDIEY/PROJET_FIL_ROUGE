<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'nom' => $this->nom,
            'login' => $this->login,
            'role' => $this->role->libelle,
        ];
    
        // Vérifiez si l'utilisateur est un professeur
        if ($this->role->libelle === 'professeur') {
            // Incluez les données spécifiques du professeur
            $data['professeur'] = new ProfesseurResource($this->professeur);
        }
    if ($this->role->libelle === 'etudiant') {
        $data['etudiant'] = new EtudiantResource($this->etudiante);

    }
        return $data;
    }
}
