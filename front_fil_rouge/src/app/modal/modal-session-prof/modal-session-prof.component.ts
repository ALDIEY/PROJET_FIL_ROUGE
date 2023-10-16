import { Component, Input ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-session-prof',
  templateUrl: './modal-session-prof.component.html',
  styleUrls: ['./modal-session-prof.component.css']
})
export class ModalSessionProfComponent {
  @Input() session: any; // Input pour recevoir les détails de la session depuis le composant parent

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ,public dialogRef: MatDialogRef<ModalSessionProfComponent>) { }
  
  closeDialog(): void {

    this.dialogRef.close();
  }
}

