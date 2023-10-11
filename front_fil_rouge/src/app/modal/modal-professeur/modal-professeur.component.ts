import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h2>Professeur Non Disponible</h2>
    <p>Le professeur n'est pas disponible à ces heures.</p>
    <button mat-button (click)="close()">Fermer</button>
  `
})
export class ProfesseurNonDisponibleModal {
  constructor(public dialogRef: MatDialogRef<ProfesseurNonDisponibleModal>) {}

  close(): void {
    this.dialogRef.close();
  }
}
