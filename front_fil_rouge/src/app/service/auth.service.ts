import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez ceci par l'URL de votre API Laravel

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  apiurl='http://127.0.0.1:8000/user';

  getAll(){
  return this.http.get(this.apiurl)
  }
  Getbycode(code:any){
  return this.http.get(this.apiurl+'/'+code)
  }
  Procedregister(inputdata:any ){
  return this.http.post(this.apiurl,inputdata)
  }
  login(data:any): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/login`, data);
  }




  private isAuthenticated: boolean = false;
  private userRole: string = '';

  // Méthodes pour définir l'état d'authentification et le rôle de l'utilisateur
  setAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  setUserRole(role: string) {
    this.userRole = role;
  }

  // Méthodes pour vérifier l'état d'authentification et le rôle de l'utilisateur
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string {
    return this.userRole;
  }
}
