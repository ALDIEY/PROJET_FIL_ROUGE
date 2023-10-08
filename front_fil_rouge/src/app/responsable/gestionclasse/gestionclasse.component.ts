import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/resposable.service';

@Component({
  selector: 'app-gestionclasse',
  templateUrl: './gestionclasse.component.html',
  styleUrls: ['./gestionclasse.component.css']
})
export class GestionclasseComponent implements OnInit {
  classeControl: FormControl[] = [];

  filieres: any[] = [];
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.classeForm = this.formBuilder.group({
      filieres_id: ['', Validators.required],
      libelle: ['', Validators.required],
    });
    this.planiclasse = this.formBuilder.group({
      classes: this.formBuilder.array([])
    });
  }

  classes: any[] = [];
  classeForm: FormGroup;
  planiclasse: FormGroup;

  ngOnInit(): void {
    this.getClasse();
    this.getFiliere();
  }

  getClasse() {
    this.apiService.getClassesNonPlanifiees().subscribe((data: any) => {
      this.classes = data;
      this.classes.forEach(classe => {
        this.addClasseControl(classe);
      });
    });
  }

  getFiliere() {
    this.apiService.getFiliere().subscribe((data: any) => {
      this.filieres = data;
    });
  }

  createClasse() {
    const formData = this.classeForm.value;
    this.apiService.createClasses(formData).subscribe((response) => {
      console.log('Classe créée avec succès !', response);
      this.classeForm.reset();
      this.getClasse();
    });
  }

  planifierClasse() {
    const planiForm = this.planiclasse.value;
    const classesSelectionnees = planiForm.classes
      .map((checked: boolean, index: number) => checked ? this.classes[index].id : null)
      .filter((id: number | null): id is number => id !== null);
    planiForm.classes = classesSelectionnees;
    console.log(planiForm);
    this.apiService.planifierClasse(planiForm).subscribe((response) => {
      console.log('Cours planifié avec succès');
      this.resetClasseControl(); // Réinitialisation des cases à cocher après la soumission
    });
  }

  addClasseControl(classe: any) {
    const control = new FormControl(classe.checked);
    this.classeControl.push(control);
    (this.planiclasse.get('classes') as FormArray).push(control);
  }

  resetClasseControl() {
    // Réinitialisation des cases à cocher
    this.classeControl.forEach(control => {
      control.setValue(false);
    });
  }
}
