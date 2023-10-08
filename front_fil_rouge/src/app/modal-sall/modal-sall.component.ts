import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h2>Salle Non Disponible</h2>
    <p>La salle n'est pas disponible à ces heures.</p>
    <button mat-button (click)="close()">Fermer</button>
  `
})
export class SalleNonDisponibleModal {
  constructor(public dialogRef: MatDialogRef<SalleNonDisponibleModal>) {}

  close(): void {
    this.dialogRef.close();
  }
}
