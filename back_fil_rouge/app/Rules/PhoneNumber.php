<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

use Illuminate\Contracts\Validation\Rule;

class PhoneNumber implements Rule
{
    public function passes($attribute, $value)
    {
        // Logique de validation du numéro de téléphone
        return preg_match('/^(77|76|70)\d{7}$/', $value);
    }

    public function message()
    {
        return 'Le numéro de téléphone doit commencer par 77, 76 ou 70 et doit avoir 9 chiffres.';
    }
}