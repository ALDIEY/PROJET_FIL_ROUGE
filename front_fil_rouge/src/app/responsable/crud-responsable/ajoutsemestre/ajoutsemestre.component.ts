import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/resposable.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-content',
  template: `
  <form (ngSubmit)="ajoutersemestre()" [formGroup]="semestreForm">
    <div class="p-3 rounded-lg shadow-md">
      <label for="semestre" class="block text-sm font-medium text-gray-600">semestre </label>
      <input placeholder="" type="text" id="semestre" name="semestre" formControlName="libelle" class="mt-1 p-2 w-full border rounded-md" required>  
      <div class="flex justify-end mt-2">
        <button type="button" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" (click)="closeModal()">Annuler</button>
        <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2" (click)="ajoutersemestre()" >Ajouter</button>
      </div>
    </div>
    </form>
  `,
})
export class AjoutsemestreComponent implements OnInit {
  semestreForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AjoutsemestreComponent>,private apiService:ApiService,private toastr: ToastrService, private fb:FormBuilder) {
    this.semestreForm = this.fb.group({
      libelle: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }


  ajoutersemestre() {
    const semestre=this.semestreForm.value
    console.log(semestre);

    
    this.apiService.createSemestre(semestre).subscribe(
      (response) => {
        console.log('le semestre a été créée avec succès :', response);
        this.toastr.success('le semestre a été ajoutée avec succès', 'Succès');
        this.semestreForm.reset()
      },
      (error) => {
        console.error('Erreur lors de la création du semestre :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout du semestre', 'Erreur');
      }
    );
  }
  
}

// export class AjoutsemestreComponent {

// }
