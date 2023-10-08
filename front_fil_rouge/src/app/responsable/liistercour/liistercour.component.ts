import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { Cours } from 'src/app/cours';
@Component({
  selector: 'app-liistercour',
  templateUrl: './liistercour.component.html',
  styleUrls: ['./liistercour.component.css']
})
export class LiistercourComponent implements OnInit  {
  ngOnInit(): void {
    this.fetchCours()
    this.filtreCoursencour()
    this.filtreCoursterminer()

  }
  coursFiltres: Cours[] = [];
  filtre: string = 'tous'; 
  cours:Cours[]=[]
constructor(private apiService:ApiService){}
fetchCours() {
  this.apiService.getCours().subscribe((data:any) => {
    console.log(data);
    this.cours=data.data
    this.appliquerFiltre()
    
    // if (Array.isArray(data)) {
    //   this.cours = data;
    // } else {
    //   this.cours = [data]; 
    //   console.log(this.cours);
      
    // }
  });
  
}
filtreCoursencour(){
this.apiService.getCoursEncour().subscribe((data:any)=>{
this.coursFiltres=data.data
})

}
filtreCoursterminer(){
  this.apiService.getCoursTerminer().subscribe((data:any)=>{
  this.coursFiltres=data.data
  })
  
  }
appliquerFiltre() {
  if (this.filtre === 'en_cours') {
this.filtreCoursencour()
  } else if (this.filtre === 'termines') {
   this.filtreCoursterminer()
  } else {
    this.coursFiltres = this.cours; // Affiche tous les cours sans filtre
  }
}


}
