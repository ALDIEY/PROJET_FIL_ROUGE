import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Cours } from 'src/app/cours';
import { ProfserviceService } from 'src/app/service/profservice.service';

@Component({
  selector: 'app-courprof',
  templateUrl: './courprof.component.html',
  styleUrls: ['./courprof.component.css'],
 
})
export class CourprofComponent implements OnInit {
  constructor(private profService:ProfserviceService){}
  user: any; 
  cours:Cours[]=[]
  ngOnInit(): void {
    
    this.getCourProf()
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      this.user = JSON.parse(userData);
      // console.log(this.user);
      // this.idprof=this.user.professeur.id
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
}


