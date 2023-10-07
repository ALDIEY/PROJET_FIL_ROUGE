<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CoursclasseResource extends JsonResource
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
            'cours_id' => $this->cours_id,
            'classe_id' => $this->classe->id,
            'classe_libelle' => $this->classe->libelle,
            'cours' => new CourResource($this->cours),             // Ajoutez d'autres champs si nécessaire
        ];
    }
}
