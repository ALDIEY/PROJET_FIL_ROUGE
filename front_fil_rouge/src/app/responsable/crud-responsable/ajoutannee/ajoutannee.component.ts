import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/resposable.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-content',
  template: `
  <form (ngSubmit)="ajouterAnnee()" [formGroup]="anneeForm">
  
    <div class="p-3 rounded-lg shadow-md">
      <label for="annee" class="block text-sm font-medium text-gray-600">Année Scolaire </label>
      <input placeholder="format XXXX-YYYY" type="text" id="annee" name="annee" formControlName="anneeScolaire" class="mt-1 p-2 w-full border rounded-md" required>
      
      <div class="flex justify-end mt-2">
        <button type="button" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" (click)="closeModal()">Annuler</button>
        <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2" (click)="ajouterAnnee()" >Ajouter</button>
      </div>
    </div>
    </form>
  `,
})
export class DialogContentComponent implements OnInit {
  anneeForm: FormGroup;
  nouvelleAnnee: string=""; // Assurez-vous de déclarer la variable ici
  constructor(private dialogRef: MatDialogRef<DialogContentComponent>,private apiService:ApiService,private toastr: ToastrService, private fb:FormBuilder) {
    this.anneeForm = this.fb.group({
      anneeScolaire: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }


  ajouterAnnee() {
    const nouvelleAnnee=this.anneeForm.value.anneeScolaire
    console.log(nouvelleAnnee);

    
    this.apiService.createAnnee(nouvelleAnnee).subscribe(
      (response) => {
        console.log('L\'année a été créée avec succès :', response);
        this.toastr.success('L\'année a été ajoutée avec succès', 'Succès');
        
      },
      (error) => {
        console.error('Erreur lors de la création de l\'année :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout de l\'année', 'Erreur');
      }
    );
  }
  
}
