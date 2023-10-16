import { Component, OnInit } from '@angular/core';
import { ProfserviceService } from '../service/profservice.service';
import { Cours } from '../cours';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalSessionComponent } from '../modal/modal-session/modal-session.component'; // Assurez-vous d'ajuster le chemin du composant du modal
import { ApiService } from '../service/resposable.service';
import { Session } from '../cours';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalSessionProfComponent } from '../modal/modal-session-prof/modal-session-prof.component';
// import {  } from "";
@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit{
  user: any; 
  cours:Cours[]=[]
  idprof:number=0
  sessions:any[]=[]

constructor(private profService:ProfserviceService, private authService:AuthService,private router:Router ,private dialog: MatDialog){}
  ngOnInit(): void {
   this.loadSessions()
    this.getCourProf()
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      this.user = JSON.parse(userData);
      // console.log(this.user);
      this.idprof=this.user.professeur.id
      // console.log(this.idprof);
      
    } else {
      console.error('Aucune donnée utilisateur trouvée dans localStorage.');
    }
  }
  getCourProf(){
  this.profService.getCoursDuProfesseur().subscribe((response:any)=>{
  this.cours=response.data
  console.log(this.cours);
  
  
  })
  
  }
  logout(): void {
    this.authService.logout().subscribe(
      (res:any) => {
        console.log(res);
        localStorage.clear()
        console.log('deconnxion effectuer')
        this.router.navigateByUrl("login")

        // La déconnexion a réussi
        // Vous pouvez effectuer des actions après la déconnexion, par exemple rediriger l'utilisateur vers la page de connexion
      },
      error => {
        // La déconnexion a échoué, gérez l'erreur ici
      }
    );
  }
  loadSessions() {
    this.profService.getSession().subscribe((data: any) => {
      this.sessions = data.data;
  
      this.calendarOptions.events = this.sessions.map(session => {
        let icon: string;
        let sessionTitle: string;
        let start: string;
        let end: string;
  
        if (session.mode === 'en_ligne') {
          icon = 'fa-calendar'; 
          sessionTitle = 'Session en ligne';
        } else {
          icon = 'fa-map-marker'; 
          sessionTitle = 'Session en personne';
        }
  
        start = `${session.date}T${session.heure_debut}`;
        end = `${session.date}T${session.heure_fin}`;
  
        return {
          id: session.id,
          title: sessionTitle,
          start: start,
          end: end,
          // debut:session.heure_debut,
  
          // this.openSessionDetailsModal(session) // Ouvrir le modal lorsque l'événement est cliqué
        };
      });
  
      console.log(this.calendarOptions.events);
    });
  }















  view:string='Week';
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGrid'+this.view,
    locale:'fr',
    plugins: [dayGridPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this)
    // eventContent: (arg, createElement) => {
    //   const container = document.createElement('div');
    //   container.innerText = arg.event.title;
    //   return { domNodes: [container] };
    // }
  };

  handleEventClick(event: any) {
    const sessionId = event.event.id;
    console.log(sessionId);
    
    const session = this.sessions.find(s => s.id ==sessionId);
  
    if (session) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '360px';
      dialogConfig.data = { session: session,
        startTime: session.heure_debut, // Passer l'heure de début au modal
        endTime: session.heure_fin // Passer l'heure de fin au modal
      };
      dialogConfig.hasBackdrop = false;
      dialogConfig.panelClass = 'custom-modal-container'; // Ajoutez une classe de conteneur personnalisée
  
      const dialogRef = this.dialog.open(ModalSessionProfComponent, dialogConfig);
    }
  }
}

