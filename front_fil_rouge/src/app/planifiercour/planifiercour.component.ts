import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/resposable.service';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormControl } from '@angular/forms';@Component({
  selector: 'app-planifiercour',
  templateUrl: './planifiercour.component.html',
  styleUrls: ['./planifiercour.component.css']
})
export class PlanifiercourComponent implements OnInit {
  classes:any[]=[]
  modules: any[]=[];
  profs: any;
  semestres: any;
  classeControl: FormControl[] = [];
  
  coursForm: FormGroup;
constructor(private apiService:ApiService,private formBuilder: FormBuilder){
  this.coursForm = this.formBuilder.group({
    modules_id: ['', Validators.required], 
    semestres_id: ['', Validators.required], 
    professeurs_id: ['', Validators.required], 
    nbr_heure: ['', Validators.required], 
    classes: this.formBuilder.array([]) 
  });
}
// formData: CoursFormData = {
//   modules_id: /* Valeur initiale du module */,
//   semestres_id: /* Valeur initiale du semestre */,
//   professeurs_id: /* Valeur initiale du professeur */,
//   nbr_heure: /* Valeur initiale du nombre d'heures */,
//   classes: [] // Valeur initiale des classes sélectionnées
// };
ngOnInit(): void {
  this.getClasse()
  this.getModule()
  this.getProf()
  this.getSemestre()
  // this.getClasseControl(inde)
}
getClasse(){
this.apiService.getClasses().subscribe((data:any)=>{
this.classes=data
this.classes.forEach(classe => {
  this.addClasseControl(classe);
});
// console.log(this.classes);
})
}
getModule(){
this.apiService.getModules().subscribe((data:any)=>{

this.modules=data
// console.log(this.modules);
})
}
getProf(){
this.apiService.getProfesseurs().subscribe((data:any)=>{
this.profs=data
})
}
getSemestre(){
this.apiService.getSemestres().subscribe((data:any)=>{
this.semestres=data
console.log(this.semestres);


})
}

planifierCours() {
  const formData = this.coursForm.value;
const classesSelectionnees = formData.classes
    .map((checked: boolean, index: number) => checked ? this.classes[index].id : null)
    .filter((id: number | null): id is number => id !== null);
  console.log( classesSelectionnees);
formData.classes=classesSelectionnees
console.log(formData);

  this.apiService.createCours(formData).subscribe(
    (response) => {
      console.log('Cours planifié avec succès !', response);
      this.coursForm.reset(); 
    },
    (error) => {
      console.error('Erreur lors de la planification du cours :', error);
    }
  );
}
getClasseControl(index: number): FormControl {
  return (this.coursForm.get('classes') as FormArray).controls[index] as FormControl;
}
get classesArray() {
  return this.coursForm.get('classes') as FormArray;
}

addClasseControl(classe: any) {
  const control = new FormControl(classe.checked );
  this.classeControl.push(control);
  (this.coursForm.get('classes') as FormArray).push(control);
}
}
