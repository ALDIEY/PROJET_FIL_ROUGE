import { Component } from '@angular/core';
import { AjoutrespoComponent } from "./ajoutrespo/ajoutrespo.component";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component'; // Importez le composant de modal
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent {
  constructor(private modalService: BsModalService,private authService:AuthService,private router:Router) {}
  modalRef: BsModalRef| null = null;;

  openModal() {
    this.modalRef = this.modalService.show(ModalComponent);
  }
  logout(): void {
    console.log(localStorage);
    
    this.authService.logout().subscribe(
      (res:any) => {
        console.log(res);
        localStorage.clear()
        console.log('deconnxion effectuer')
        // this.router.navigateByUrl("login")
        this.router.navigate(['/login']);
              },
      error => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }
}
