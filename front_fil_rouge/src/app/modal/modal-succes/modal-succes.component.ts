import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
  <!-- <div class="flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-75"> -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-4">Session Créée Avec Succès</h2>
      <p class="text-gray-700 mb-4">La session a été créée avec succès.</p>
      <button mat-button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200" (click)="close()">Fermer</button>
    </div>
  <!-- </div> -->
`,
})
export class SuccesModal {
  constructor(public dialogRef: MatDialogRef<SuccesModal>) {}

  close(): void {
    this.dialogRef.close();
  }
}
