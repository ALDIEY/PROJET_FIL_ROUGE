import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Environnement } from "../environnement/environnement";

@Injectable({
  providedIn: 'root'
})
export class AttacheService {

  constructor(private http: HttpClient ) { }
  apiUrl: string = Environnement.apiUrl;
  apiurl=`${this.apiUrl}`+'/user';
  validerSession(sessionId: number): Observable<any> {
    const url = `${this.apiUrl}/session/${sessionId}/valider`; 
    return this.http.get(url);
  }
  getDemande(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/demandes`);
  }
  validerDemande(demandeId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/demandes/${demandeId}/valider`);
  }
  annulerDemande(demandeId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/demandes/${demandeId}/annuler`);
  }
  annulerSession(sessionId: number): Observable<any> {
    const url = `${this.apiUrl}/session/${sessionId}/annuler`; 
    return this.http.delete(url);
  }
}
