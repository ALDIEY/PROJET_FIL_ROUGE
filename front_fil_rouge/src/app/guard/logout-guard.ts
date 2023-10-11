import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Assurez-vous d'ajuster le chemin

@Injectable({
  providedIn: 'root'
})
export class DeconnexionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.estUtilisateurConnecte()) {
      // L'utilisateur est déjà déconnecté, ne permettez pas l'accès
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
