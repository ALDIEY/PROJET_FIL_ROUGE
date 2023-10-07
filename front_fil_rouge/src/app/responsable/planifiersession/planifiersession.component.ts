import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planifiersession',
  templateUrl: './planifiersession.component.html',
  styleUrls: ['./planifiersession.component.css']
})
export class PlanifiersessionComponent implements OnInit {
  courclasse:any[]=[]
  salles: any[]=[];
  // coursClasses: any[];
  sessionForm: FormGroup
  constructor(private apiService:ApiService,private fb:FormBuilder){
    this.sessionForm = this.fb.group({
      date: ['', Validators.required],
      cour_classes_id: [''],
      heure_fin: ['', Validators.required],
      heure_debut: ['', [Validators.required, Validators.min(1)]],
      mode: ['', Validators.required],
      salles_id: [''] // Champ de sélection de la salle
    });
  }
  ngOnInit(): void {
    this.getCours()
    this.getSalles()
  }
getCours(){
this.apiService.getCoursClasses().subscribe((data:any)=>{
this.courclasse=data.data

console.log(this.courclasse);

})
}
getSalles(){
this.apiService.getSalles().subscribe((data)=>{
this.salles=data
// console.log(this.salles);

})
}
planifierSession() {
  // Ici, vous pouvez récupérer les valeurs du formulaire et les soumettre à votre service/API
  
  const formData = this.sessionForm.value;
  formData.heure_debut= formData.heure_debut += ":00"
  formData.heure_fin= formData.heure_fin += ":00"

  console.log(formData);
  // Ensuite, soumettez les données à votre service/API
  this.apiService.createSeesion(formData).subscribe((response) =>{
  console.log('session cree avec succes',response);
  
  
},
(error) => {
  console.error('Erreur lors de la planification du session :', error);
}
  )
}
}
