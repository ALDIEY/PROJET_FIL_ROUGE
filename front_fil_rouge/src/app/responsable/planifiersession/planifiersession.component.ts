import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidator, positiveNumberValidator } from "../../validator/sessionvalidator";
import { MatDialog } from '@angular/material/dialog';
import { ProfesseurNonDisponibleModal} from '../../modal-professeur/modal-professeur.component';
import { SalleNonDisponibleModal} from '../../modal-sall/modal-sall.component';
import { SuccesModal } from "../../modal-succes/modal-succes.component";

@Component({
  selector: 'app-planifiersession',
  templateUrl: './planifiersession.component.html',
  styleUrls: ['./planifiersession.component.css']
})
export class PlanifiersessionComponent implements OnInit {
  openErreurModal: boolean = false;

  courclasse:any[]=[]
  salles: any[]=[];
  // coursClasses: any[];
  sessionForm: FormGroup
  constructor(private apiService:ApiService,private fb:FormBuilder,public dialog: MatDialog){
    this.sessionForm = this.fb.group({
      date: ['', [Validators.required, dateValidator]],
      cour_classes_id: [''],
      heure_fin: ['', Validators.required ],
      heure_debut: ['', [Validators.required,]],
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
  if (this.sessionForm.invalid) {

    console.log('Le formulaire est invalide.');
    return;
  }
  const formData = this.sessionForm.value;
  if (formData.mode === 'en_ligne') {
    formData.salles_id = null;
  } 
  formData.heure_debut= formData.heure_debut += ":00"
  formData.heure_fin= formData.heure_fin += ":00"

  console.log(formData);
  // Ensuite, soumettez les données à votre service/API
  this.apiService.createSeesion(formData).subscribe((response:any) =>{
    console.log('Réponse du serveur :', response);

    if (response.message === 'Le professeur n\'est pas disponible à ces heures.') {
      this.openProfesseurNonDisponibleModal();
    } else if (response.message === 'La salle n\'est pas disponible à ces heures.') {
      this.openSalleNonDisponibleModal();
    } else if (response.message === 'Session créée avec succès') {
      this.openSuccesModal();
      // console.log('sava');
      
      this.sessionForm.reset();
    } else {
      // Gérez d'autres réponses du serveur ici, par exemple, affichez une modal d'erreur générale
      this.openErreurModalFunction();
    }
  },
  (error) => {
    console.error('Erreur lors de la planification de la session :', error);
    // Gérez les erreurs ici, par exemple, affichez une modal d'erreur générale
    this.openErreurModalFunction();
  }
);
}
openProfesseurNonDisponibleModal(): void {
  this.dialog.open(ProfesseurNonDisponibleModal);
}

openSalleNonDisponibleModal(): void {
  this.dialog.open(SalleNonDisponibleModal);
}

openSuccesModal(): void {
  this.dialog.open(SuccesModal);
}

openErreurModalFunction() {
  this.openErreurModal = true;
}

// Ajoutez la méthode pour fermer le modal d'erreur
closeErreurModal() {
  this.openErreurModal = false;
}
}
