import { Component } from '@angular/core';
import { AjoutrespoComponent } from "./ajoutrespo/ajoutrespo.component";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component'; // Importez le composant de modal
@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent {
  constructor(private modalService: BsModalService) {}
  modalRef: BsModalRef| null = null;;

  openModal() {
    this.modalRef = this.modalService.show(ModalComponent);
  }
}
