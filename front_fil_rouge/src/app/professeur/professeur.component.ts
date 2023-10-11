import { Component, OnInit } from '@angular/core';
import { ProfserviceService } from '../service/profservice.service';
import { Cours } from '../cours';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

// import {  } from "";
@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit{
  user: any; 
  cours:Cours[]=[]
  idprof:number=0
constructor(private profService:ProfserviceService, private authService:AuthService,private router:Router ){}
  ngOnInit(): void {
   this.getSession()
    this.getCourProf()
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      this.user = JSON.parse(userData);
      // console.log(this.user);
      this.idprof=this.user.professeur.id
      // console.log(this.idprof);
      
    } else {
      console.error('Aucune donnée utilisateur trouvée dans localStorage.');
    }
  }
  getCourProf(){
  this.profService.getCoursDuProfesseur().subscribe((response:any)=>{
  this.cours=response.data
  console.log(this.cours);
  
  
  })
  
  }
  logout(): void {
    this.authService.logout().subscribe(
      (res:any) => {
        console.log(res);
        
        console.log('deconnxion effectuer')
        this.router.navigateByUrl("login")

        // La déconnexion a réussi
        // Vous pouvez effectuer des actions après la déconnexion, par exemple rediriger l'utilisateur vers la page de connexion
      },
      error => {
        // La déconnexion a échoué, gérez l'erreur ici
      }
    );
  }
  getSession(){
  
  this.profService.getSession().subscribe((data:any)=>{
  console.log(data);
  
  
  })
  }
}

