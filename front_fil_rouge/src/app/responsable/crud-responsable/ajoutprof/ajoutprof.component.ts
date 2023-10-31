import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/resposable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutprof',
  template: `<form [formGroup]="professeurForm" class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
  <div class="mb-4">
      <label for="name" class="block text-sm font-semibold text-gray-600">Nom :</label>
      <input type="text" id="name" formControlName="name" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <div class="mb-4">
      <label for="grade" class="block text-sm font-semibold text-gray-600">Grade :</label>
      <input type="text" id="grade" formControlName="grade" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <div class="mb-4">
      <label for="email" class="block text-sm font-semibold text-gray-600">Email :</label>
      <input type="email" id="email" formControlName="email" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <div class="mb-4">
      <label for="specialite" class="block text-sm font-semibold text-gray-600">Spécialité :</label>
      <input type="text" id="specialite" formControlName="specialite" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <div class="mb-4">
      <label for="password" class="block text-sm font-semibold text-gray-600">Mot de passe :</label>
      <input type="password" id="password" formControlName="password" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <div class="mb-4">
      <label for="login" class="block text-sm font-semibold text-gray-600">Login :</label>
      <input type="text" id="login" formControlName="login" class="mt-1 p-2 w-full border rounded-md">
  </div>

  <button type="submit" (click)="onSubmit()" [disabled]="professeurForm.invalid" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Ajouter Professeur
  </button>
</form>


`,
})
export class AjoutprofComponent implements OnInit {
  professeurForm: FormGroup;
    constructor(private dialogRef: MatDialogRef<AjoutprofComponent>,private apiService:ApiService,private toastr: ToastrService,private fb:FormBuilder) { 
    
    this.professeurForm = this.fb.group({
    name: ['', Validators.required],
    grade: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    specialite: ['', Validators.required],
    password: ['', Validators.required],
    login: ['', Validators.required],
  });}

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.professeurForm.valid) {
      const professeurData= this.professeurForm.value;
console.log(professeurData);

      this.apiService.createProfesseur(professeurData).subscribe(
        (response) => {
          // Gérez la réponse de l'API (peut-être affichez un message de succès, redirigez l'utilisateur, etc.)
          console.log('Professeur ajouté avec succès :', response);
          if (response.message=='Professeur ajouté avec succès') {
            Swal.fire({
              icon: 'success',
              title: 'Succès!',
              text: 'Professeur ajouté avec succès.',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
              }
            });
          }
         
        },
        (error) => {
          // Gérez les erreurs ici (peut-être affichez un message d'erreur à l'utilisateur)
          console.error('Erreur lors de l\'ajout du professeur :', error);
        }
      );
    }
  }
}
