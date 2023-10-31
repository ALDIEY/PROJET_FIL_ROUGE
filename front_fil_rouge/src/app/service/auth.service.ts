import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Environnement } from "../environnement/environnement";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router ) { }
  apiUrl: string = Environnement.apiUrl;
  apiurl=`${this.apiUrl}`+'/user';


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
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }




  private isAuthenticated: boolean = false;
  private userRole: string = '';

  setAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  setUserRole(role: string) {
    this.userRole = role;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string {
    return this.userRole;
  }
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }
  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
  private estConnecte = false;

  estUtilisateurConnecte(): boolean {
    const token = localStorage.getItem('token');
    // console.log('Token:', token); // Vérifiez le token dans la console
    return token !== null;
  }
  
  connecterUtilisateur() {
    this.estConnecte = true;
  }

  deconnecterUtilisateur() {
    this.estConnecte = false;
  }
}
