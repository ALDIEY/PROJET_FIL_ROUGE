// 
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/resposable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutsalle',
  template: `
    <form (ngSubmit)="ajouterSalle()" [formGroup]="salleForm">
      <div class="p-3 rounded-lg shadow-md">
        <label for="nom" class="block text-sm font-medium text-gray-600">Nom de la Salles</label>
        <input placeholder="" type="text" id="nom" name="nom" formControlName="nom" class="mt-1 p-2 w-full border rounded-md" required>
        <label for="nbriplaces" class="block text-sm font-medium text-gray-600">nombre de places </label>
        <input placeholder="" type="number" id="nbr_places" name="nbr_places" formControlName="nbr_places" class="mt-1 p-2 w-full border rounded-md" required>
        <div *ngIf="salleForm.get('nbr_places')?.hasError('min') && salleForm.get('nbr_places')?.touched"
                        [ngClass]="{'texte-erreur': salleForm.get('nbr_places')?.hasError('min')}">
                     La valeur doit être au moins 1.
                   </div>
        <div class="flex justify-end mt-2">
          <button type="button" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" (click)="closeModal()">Annuler</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">Ajouter</button>
        </div>
      </div>
    </form>
  `,
})
export class AjoutsalleComponent {
  salleForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AjoutsalleComponent>, private respoService: ApiService, private fb: FormBuilder) {
    this.salleForm = this.fb.group({
      nom: ['', [Validators.required]],
      nbr_places: ['', [Validators.required,Validators.min(1)]]
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  ajouterSalle() {
    if (this.salleForm.invalid) {
      // Gérer les erreurs du formulaire ici
      return;
    }

    const data = this.salleForm.value;
    this.respoService.createSalles(data).subscribe(response => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Salle ajoutée avec succès.',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
        }
      });
    });
  }
}
