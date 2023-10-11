import { Component, Input ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-session',
  templateUrl: './modal-session.component.html',
  styleUrls: ['./modal-session.component.css']
})
export class ModalSessionComponent {
  @Input() session: any; // Input pour recevoir les détails de la session depuis le composant parent

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ,public dialogRef: MatDialogRef<ModalSessionComponent>) { }
  
  closeDialog(): void {

    this.dialogRef.close();
  }
}