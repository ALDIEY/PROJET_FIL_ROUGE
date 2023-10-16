import { Component, Input ,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfserviceService } from 'src/app/service/profservice.service';
import { ApiService } from 'src/app/service/resposable.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-session',
  templateUrl: './modal-session.component.html',
  styleUrls: ['./modal-session.component.css']
})
export class ModalSessionComponent implements OnInit {
  @Input() session: any; 
  // sessionId: number=0
motif:string=''
showDemandeModal: boolean = false;
demandeAnnulationForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ,public dialogRef: MatDialogRef<ModalSessionComponent>,private apiService:ApiService,private profService:ProfserviceService,private fb:FormBuilder) {
  
    this.demandeAnnulationForm = this.fb.group({
      motif: ['', Validators.required],
      professeurs_id:[''],
      sessions_id:['']
    });
  }
  
  demanderAnnulation(): void {
    // Afficher le modal de demande d'annulation
    this.showDemandeModal = true;
  }
  
  closeDialog(): void {

    this.dialogRef.close();
  }

  ngOnInit(): void {
    
    // this.demandeannulation()

}
  // this.sessionId=session.id
  annulerSession(): void {
    const sessionId = this.data.session.id;

    //  console.log(sessionId);
    
    this.apiService.annulerSession(sessionId).subscribe(
      response => {
        console.log(response);
        if (response.message === 'session déja annuler') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La session est déjà annulée!',
            // footer: '<a href="">Pourquoi ce problème?</a>'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'La session a été annulée avec succès.',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
            }
          });
        }
      },
      error => {
        console.error('Erreur lors de l\'annulation de la session :', error);
        // Effectuez les actions nécessaires en cas d'erreur
      }
    );
    
    
  }

  // demandeAnnulation() {
  //   const sessionId = this.data.session.id;
  
  //   this.profService.demandeAnnulation().subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Succès!',
  //           text: 'Votre demande d\'annulation de session a été soumise avec succès.',
  //           confirmButtonText: 'OK'
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
  //           }
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Votre demande d\'annulation de session n\'a pas pu être soumise. Veuillez réessayer plus tard.',
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la soumission de la demande d\'annulation de session :', error);
  //       // Effectuez les actions nécessaires en cas d'erreur
  //     }
  //   );
  // }
  estProfesseurConnecte(): boolean {
    // Obtenez les informations de l'utilisateur à partir du stockage local
    const userString = localStorage.getItem('user');
  
    if (userString !== null) {
      const user = JSON.parse(userString);
  
      // Vérifiez si l'utilisateur est un professeur (ajoutez la logique appropriée ici)
      // Par exemple, si le rôle du professeur est stocké dans le champ 'role' de l'objet utilisateur
      return user.role === 'professeur';
    }
  
    return false; // Retourne false si aucune information sur l'utilisateur n'est trouvée
  }
  demandeannulation(){
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
     const profId=  user.professeur.id
     const sessionId = this.data.session.id;
console.log(user);

     const formdata=this.demandeAnnulationForm.value
    formdata.professeurs_id=profId
    formdata.sessions_id=sessionId
console.log(formdata);

    this.profService.demandeAnnulation(formdata).subscribe(
      (response: any) => {
        console.log(response.message);
        
        if (response.message==='Demande annulation soumise avec succès') {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Demande d\'annulation soumise avec succès',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
            }
          });
        } else  if (response.message==='Cette session est déjà annulée.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cette session est déjà annulée ou n\'existe pas.',
          });
          // this.closeDialog()
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Votre demande d\'annulation de session n\'a pas pu être soumise. Veuillez réessayer plus tard.',
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la soumission de la demande d\'annulation de session :', error);
        // Effectuez les actions nécessaires en cas d'erreur
      }
    );

  }
  }
  
}