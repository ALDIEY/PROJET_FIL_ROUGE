import { Component, OnInit } from '@angular/core';
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
export class ResponsableComponent  implements OnInit{
  constructor(private modalService: BsModalService,private authService:AuthService,private router:Router) {}
  modalRef: BsModalRef| null = null;;
ngOnInit(): void {
  // this.logout()
}
  openModal() {
    this.modalRef = this.modalService.show(ModalComponent);
  }
  deconnexion(): void {
    this.authService.logout();
  }
  // logout(): void {
  //   this.authService.logout().subscribe(
  //     (res:any) => {
  //       console.log(res);
  //       localStorage.clear()
  //       console.log('deconnxion effectuer')
  //       this.router.navigateByUrl("login")

  //       // La déconnexion a réussi
  //       // Vous pouvez effectuer des actions après la déconnexion, par exemple rediriger l'utilisateur vers la page de connexion
  //     },
  //     error => {
  //       // La déconnexion a échoué, gérez l'erreur ici
  //     }
  //   );
  // }
}
