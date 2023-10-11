<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PhoneNumber;

class InscriptionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            // 'telephone' => ['required', 'string', new PhoneNumber, 'unique:etudiants'],
            'email' => 'required|string|email|unique:etudiants',
            // ...autres règles de validation
        ];
    }

    public function messages()
    {
        return [
            'telephone.required' => 'Le numéro de téléphone est requis.',
            'telephone.string' => 'Le numéro de téléphone doit être une chaîne de caractères.',
            'telephone.unique' => 'Ce numéro de téléphone est déjà utilisé.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'email.email' => 'L\'adresse e-mail doit être une adresse e-mail valide.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
            // ...autres messages d'erreur
        ];
    }
}
