<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfesseurRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
                'grade' => 'required|string|max:255',
                'specialite' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:professeurs',
                'password' => 'required|string',
                'login' => 'required|string'
        ];
    }
}
