import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/cours';
import { AttacheService } from 'src/app/service/attache.service';
import { ApiService } from 'src/app/service/resposable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent  implements OnInit{
  sessions:any[]=[]
  semaine: number = 1;
  p: number = 1;
constructor(private respoService:ApiService,private attacheService:AttacheService){}
ngOnInit(): void {
  this.getSession()
  // this.loadSessionsByWeek(NUMERO_SEMAINE)
}
getSession() {
  this.respoService.getSession().subscribe((data: any) => {
      this.sessions = data.data;
      this.sessions = this.sessions.filter(session => session.etat === 'attente');
      console.log(this.sessions);
  });
}

// Dans votre composant Angular
getNomJour(date: string): string {
  const joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const numeroJour = new Date(date).getDay();
  return joursSemaine[numeroJour];
}
// loadSessionsByWeek(semaine: number): void {
//   this.respoService.getSessionsByWeek(semaine)
//     .subscribe(sessions => {
//       // console.log(sessions); // Vérifiez la structure des données ici
//       this.sessions = sessions;
//     });
// }

// incrementerSemaine() {
//   this.semaine++;
//   // this.loadSessionsByWeek(this.semaine);
// }

// decrementerSemaine() {
//   if (this.semaine > 1) {
//     this.semaine--;
//     // this.loadSessionsByWeek();
//   }
// }
annulerSession(sessionId: number): void {
  // Appel à votre service pour annuler la session
  this.attacheService.annulerSession(sessionId).subscribe(
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
validerSession(sessionId: number): void {
  // Appel à votre service pour annuler la session
  this.attacheService.validerSession(sessionId).subscribe(
    response => {
      console.log(response);
      if (response.message === 'session déja valider') {
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
          text: 'La session a été valider avec succès.',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Actualisez la page après la confirmation de l'utilisateur
          }
        });
      }
    },
    error => {
      console.error('Erreur lors de la validation de la session :', error);
      // Effectuez les actions nécessaires en cas d'erreur
    }
  );
}
getDateAujourdhui(): string {
  const aujourdhui = new Date();
  const annee = aujourdhui.getFullYear();
  const mois = String(aujourdhui.getMonth() + 1).padStart(2, '0');
  const jour = String(aujourdhui.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
}



}
