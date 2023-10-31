import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/resposable.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-content',
  template: `
  <form (ngSubmit)="ajoutermodule()" [formGroup]="moduleForm">
    <div class="p-3 rounded-lg shadow-md">
      <label for="module" class="block text-sm font-medium text-gray-600">Module </label>
      <input placeholder="" type="text" id="module" name="module" formControlName="libelle" class="mt-1 p-2 w-full border rounded-md" required>  
      <div class="flex justify-end mt-2">
        <button type="button" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" (click)="closeModal()">Annuler</button>
        <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2" (click)="ajoutermodule()" >Ajouter</button>
      </div>
    </div>
    </form>
  `,
})
export class AjoutmoduleComponent implements OnInit {
  moduleForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AjoutmoduleComponent>,private apiService:ApiService,private toastr: ToastrService, private fb:FormBuilder) {
    this.moduleForm = this.fb.group({
      libelle: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }


  ajoutermodule() {
    const module=this.moduleForm.value
    console.log(module);

    
    this.apiService.createModule(module).subscribe(
      (response) => {
        console.log('le module a été créée avec succès :', response);
        this.toastr.success('le module a été ajoutée avec succès', 'Succès');
        this.moduleForm.reset()
      },
      (error) => {
        console.error('Erreur lors de la création du module :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout du module', 'Erreur');
      }
    );
  }
  
}

// export class AjoutmoduleComponent {

// }
