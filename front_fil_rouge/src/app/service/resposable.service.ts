import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Session  } from "../model/session";
import { Cours } from '../cours';
import { Environnement } from '../environnement/environnement';
import { Data } from '@angular/router';
import { Etudiant, Root } from '../interface';
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez ceci par l'URL de votre API Laravel

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = Environnement.apiUrl;

  cours: Cours[] = [];

  constructor(private http: HttpClient) {}
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules`);
  }

  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`);
  }

  createClasses(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/classes`, data);
  }

  getProfesseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professeurs`);
  }

  createProfesseur(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/professeurs`, data);
  }
  getSalles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/salles`);
  }

  createSalles(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salles`, data);
  }
  
  getSemestres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/semestres`);
  }

  createSemestres(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/semestres`, data);
  }
  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/cours`);
  }

  
  createSeesion(data: any[]): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/sessions`, data);
  }
  createAnnee(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/annees`, data);
  }
  getSessionsByDate(date: string): Observable<Session[]> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.get<Session[]>(url);
  }
  getCoursClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours/classe`);
  }
  getClassesByCours(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours/${coursId}/classes`);
  }
  getCoursEncour(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/encours`);
  }

  getCoursTerminer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terminer`);
  }

  getFiliere(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filiere`);
  }


  getClassesPlanifiees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planifier`);
  }

  getClassesNonPlanifiees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nonplanifier`);
  }


  planifierClasse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/classeplanifier`, data);
  }
  getSession(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sessions`);

  }
  inscription(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inscription`, data);
  }
  getEtudiantsByClasseId(classeId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/classes/${classeId}/etudiants`);
  }
  getEtudiantCour(classeId:number): Observable<Root> {
    return this.http.get<Root>(`${this.apiUrl}/etudiants/${classeId}`);
  }

  annulerSession(sessionId: number): Observable<any> {
    const url = `${this.apiUrl}/session/${sessionId}/annuler`; 
    return this.http.delete(url);
  }
  createCours(data: any): Observable<any> {
    const url = `${this.apiUrl}/cours`; 
    return this.http.post<any>(url, data); 
  }
  
  // getSessionsByWeek(semaine: number): Observable<Session[]> {
  //   return this.http.get<Session[]>(`${{this.apiUrl}}/sessions/semaine/${semaine}`)
  //     .pipe(
  //       // tap(sessions => console.log(sessions)) // Vérifiez les données avant de les renvoyer
  //     );
  // }
  // Répétez ces méthodes pour les salles, les semestres, les cours, etc.
}
