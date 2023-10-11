import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/resposable.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent  implements OnInit{
  sessions:any[]=[]
  semaine: number = 1;

constructor(private respoService:ApiService){}
ngOnInit(): void {
  this.getSession()
  // this.loadSessionsByWeek(NUMERO_SEMAINE)
}
getSession(){
this.respoService.getSession().subscribe((data:any)=>{
this.sessions=data.data
// console.log(this.sessions);


})
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
}
