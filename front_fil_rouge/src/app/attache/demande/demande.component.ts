import { Component, OnInit } from '@angular/core';
import { AttacheService } from 'src/app/service/attache.service';
import { ApiService } from 'src/app/service/resposable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demandes:any[]=[]
  p: number = 1;

  constructor(private attacheService:AttacheService,private respoService:ApiService){}
ngOnInit(): void {
  this.getDemande()
}
getDemande(){
this.attacheService.getDemande().subscribe((data:any)=>{
this.demandes=data.data
console.log(this.demandes);



})

}
// annulerSession(sessionId: number): void {
//   // Appel à votre service pour annuler la session
//   this.respoService.annulerSession(sessionId).subscribe(
//     response => {
//       console.log(response);
//       if (response.message === 'session déja annuler') {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'La session est déjà annulée!',
//           // footer: '<a href="">Pourquoi ce problème?</a>'
//         });
//       } else {
//         Swal.fire({
//           icon: 'success',
//           title: 'Succès!',
//           text: 'La session a été annulée avec succès.',
//           confirmButtonText: 'OK'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
//           }
//         });
//       }
//     },
//     error => {
//       console.error('Erreur lors de l\'annulation de la session :', error);
//       // Effectuez les actions nécessaires en cas d'erreur
//     }
//   );
// }
getNomJour(date: string): string {
  const joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const numeroJour = new Date(date).getDay();
  return joursSemaine[numeroJour];
}
getDateAujourdhui(): string {
  const aujourdhui = new Date();
  const annee = aujourdhui.getFullYear();
  const mois = String(aujourdhui.getMonth() + 1).padStart(2, '0');
  const jour = String(aujourdhui.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
}
annulerDemande(demandeId:number){
  this.attacheService.annulerDemande(demandeId).subscribe(
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
          text: 'La demande a été annulée avec succès.',
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
validerDemande(demandeId:number){
  this.attacheService.validerDemande(demandeId).subscribe(
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
          text: 'La demande a été annulée avec succès.',
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

}
