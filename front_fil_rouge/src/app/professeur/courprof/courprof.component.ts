import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Cours } from 'src/app/cours';
import { ProfserviceService } from 'src/app/service/profservice.service';
import { ApiService } from 'src/app/service/resposable.service';

@Component({
  selector: 'app-courprof',
  templateUrl: './courprof.component.html',
  styleUrls: ['./courprof.component.css'],
 
})
export class CourprofComponent implements OnInit {
  constructor(private profService:ProfserviceService,private apiService:ApiService){}
  aucunCoursTrouve: boolean = false;
  moduleId: number=0;
  modules:any[]=[]
  mois: number=0;
  heuresEffectuees: number=0;
  coursFiltres:any[]=[]
  user: any; 
  cours:Cours[]=[]
  ngOnInit(): void {
    this.getModule()

    this.rechercherHeuresEffectuees()
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
  this.coursFiltres = this.cours;
  console.log(this.cours);
  
  
  })
  
  }
  rechercherHeuresEffectuees(): void {
    this.profService.getHeuresEffectueesParMois()
      .subscribe(heures => {
        this.heuresEffectuees = heures;
        // console.log(this.heuresEffectuees);
        
      });
  }
  appliquerFiltreModule() {
    if (this.moduleId !== null) {
      this.coursFiltres = this.cours.filter(c => c.modules_id === this.moduleId);
      console.log(this.coursFiltres);

    } else {
      this.coursFiltres = this.cours;
      // console.log(this.cours);

    }
  }
  getModule(){
    this.apiService.getModules().subscribe((data:any)=>{
    this.modules=data
    this.modules.unshift({ id: null, libelle: 'Tous les modules' });
    console.log(this.modules);
    
    
    })
    
    }
}


