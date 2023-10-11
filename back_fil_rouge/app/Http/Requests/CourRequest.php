<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return
            //
            [
                'modules_id' => 'required|exists:modules,id',
                'semestres_id' => 'required|exists:semestres,id',
                'professeurs_id' => 'required|exists:professeurs,id',
                'nbr_heure' => 'required|integer',
                'classes' => 'required|array'
            ];
        
    }
}
