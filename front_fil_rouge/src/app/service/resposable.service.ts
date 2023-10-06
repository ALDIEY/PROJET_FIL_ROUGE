import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Session  } from "../model/session";
import { Cours } from '../cours';
const API_BASE_URL = 'http://127.0.0.1:8001/api'; // Remplacez ceci par l'URL de votre API Laravel

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  cours: Cours[] = [];

  constructor(private http: HttpClient) {}
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/modules`);
  }

  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/classes`);
  }

  createClasses(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/classes`, data);
  }

  getProfesseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/professeurs`);
  }

  createProfesseur(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/professeurs`, data);
  }
  getSalles(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/salles`);
  }

  createSalles(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/salles`, data);
  }
  
  getSemestres(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/semestres`);
  }

  createSemestres(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/semestres`, data);
  }
  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${API_BASE_URL}/cours`);
  }

  createCours(data: any[]): Observable<any[]> {
    return this.http.post<any>(`${API_BASE_URL}/cours`, data);
  }
  createAnnee(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/annees`, data);
  }
  getSessionsByDate(date: string): Observable<Session[]> {
    const url = `${API_BASE_URL}/${date}`;
    return this.http.get<Session[]>(url);
  }
  // Répétez ces méthodes pour les salles, les semestres, les cours, etc.
}
