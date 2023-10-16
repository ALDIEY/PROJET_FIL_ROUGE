<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id'=>$this->id,
        'nom'=>$this->etudiant->nom,
        'prenom'=>$this->etudiant->prenom,
        'email'=>$this->etudiant->email,
        'telephone'=>$this->etudiant->telephone,


        'classe'=>$this->classe->libelle

        ];
    }
}
