import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Assurez-vous d'ajuster le chemin

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.estUtilisateurConnecte()) {
      return true;
    } else {
      // Redirigez l'utilisateur vers la page de connexion si non authentifié
      this.router.navigate(['/login']);
      return false;
    }
  }
  candéActivate(): boolean {
    if (!this.authService.estUtilisateurConnecte()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}