<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   // CheckRole.php
// CheckRole.php
public function handle($request, Closure $next, ...$roles)
    {
        // Vérifie si l'utilisateur est connecté
        if (Auth::check()) {
            // Récupère le rôle de l'utilisateur connecté
            $userRole = Auth::user()->role->libelle; // Assurez-vous que 'libelle' est le nom du champ dans votre table de rôles

            // Vérifie si le rôle de l'utilisateur est dans la liste des rôles autorisés
            if (in_array($userRole, $roles)) {
                return $next($request);
            }
        }

        // Redirige l'utilisateur non autorisé
        return response()->json(['error' => 'Unauthorized'], 401);
    }



}
