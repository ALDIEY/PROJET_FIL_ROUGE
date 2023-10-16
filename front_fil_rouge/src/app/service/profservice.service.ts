import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Cours } from '../cours';
import { Environnement } from '../environnement/environnement';
 const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez ceci par l'URL de votre API Laravel

@Injectable({
  providedIn: 'root'
})
export class ProfserviceService {
  apiUrl: string = Environnement.apiUrl;

  cours: Cours[] = [];

  constructor(private http: HttpClient) { }
  getCoursDuProfesseur(): Observable<any[]> {
    // Récupérer le jeton d'authentification depuis le stockage local ou tout autre méthode d'authentification que vous utilisez
    const token = localStorage.getItem('token'); // Vous devriez stocker le jeton dans le stockage local lors de la connexion de l'utilisateur

    // Vérifiez si le jeton d'authentification est disponible
    if (token) {
      // Ajoutez le jeton d'authentification à l'en-tête de la requête
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any[]>(`${this.apiUrl}/courprof`, { headers: headers });
    } else {
         return new Observable<any[]>(observer => observer.error('Utilisateur non authentifié'));
    }
  }
  getSession(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      // Ajoutez le jeton d'authentification à l'en-tête de la requête
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any[]>(`${this.apiUrl}/sessionprof`, { headers: headers });
    } else {
         return new Observable<any[]>(observer => observer.error('Utilisateur non authentifié'));
    }
  }
  demandeAnnulation(data:any): Observable<any[]> {
    // const request = {
    //   professeurs_id: professorId,
    //   sessions_id: sessionId,
    //   motif: motif
    // };
    return this.http.post<any>(`${this.apiUrl}/demandes`, data);
  }
  getHeuresEffectueesParMois(): Observable<number> {
    const url = `${this.apiUrl}/sessions/professeur/mois`;
    return this.http.get<number>(url);
  }
  getTotalHeures(month: string, moduleId: number) {
    const url = `${this.apiUrl}/nbr-heure/module?moduleId=${moduleId}`;

    return this.http.get(url);
  }
}
