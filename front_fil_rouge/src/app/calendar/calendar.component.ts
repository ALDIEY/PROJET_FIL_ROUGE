import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalSessionComponent } from '../modal/modal-session/modal-session.component'; // Assurez-vous d'ajuster le chemin du composant du modal
import { ApiService } from '../service/resposable.service';
import { Session } from '../cours';
import { MatDialogConfig } from '@angular/material/dialog';
import { ProfserviceService } from '../service/profservice.service';
import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  sessions:any[]=[]
  constructor(private profService:ProfserviceService, private apiService:ApiService,private dialog: MatDialog){}
  view: string = 'month';
  // vieww:CalendarView.Month 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGrid',
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
  // handleEventClick(info: EventClickArg) {
  //   const session = info.event.extendedProps;
  //   const content = `
  //     <p><strong>Heure de début:</strong> ${session['heureDebut']}</p>
  //     <p><strong>Heure de fin:</strong> ${session['heureFin']}</p>
  //     <p><strong>Durée:</strong> ${session['duree']}</p>
  //     <p><strong>Responsable:</strong> ${session['responsable']}</p>
  //   `;
  
  //   // Afficher le contenu dans une boîte de dialogue ou un pop-up
  //   // Utilisez ici votre méthode d'affichage de boîte de dialogue
  // }
  ngOnInit(): void {
    // this.view = 'month'; // Initialisez la vue à 'month' par défaut
    this.filtreCalendar();
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
      if (user && user.role === 'professeur') {
        this.loadSessionsProf();
      } else if (user.role === 'responsable') {
        this.loadSessions();
      }
    }
  }
  
  
// Service


filtreCalendar(): void {
  switch (this.view) {
    case 'day':
      this.calendarOptions.initialView = 'dayGridDay';
      break;
    case 'week':
      this.calendarOptions.initialView = 'dayGridWeek';
      break;
    case 'month':
      this.calendarOptions.initialView = 'dayGridMonth';
      break;
    default:
      this.calendarOptions.initialView = 'dayGridMonth';
      break;
  }
}





 // Component

 loadSessions() {
  this.apiService.getSession().subscribe((data: any) => {
    this.sessions = data.data;
console.log(this.sessions);

    this.calendarOptions.events = this.sessions.map(session => {
      let icon: string;
      let sessionTitle: string;
      let start: string;
      let end: string;
      let className: string;
    let professeur:string
      if (session.mode === 'en_ligne') {
        icon = 'fa-calendar'; 
        sessionTitle = 'Session en ligne';
      } else  {
        icon = 'fa-map-marker'; 
        sessionTitle = 'Session en présentiel';
      }

      start = `${session.date}T${session.heure_debut}`;
      end = `${session.date}T${session.heure_fin}`;

      // Déterminez la classe CSS en fonction de l'état de la session
      if (session.etat === 'annuler') {
        className = 'session-annulee';
      } else if (session.etat === 'attente') {
        className = 'session-passee';
      } else  {
        className = 'session-valide'; 
      }

      return {
        id: session.id,
        title: sessionTitle,
        start: start,
        professeur:session.professeur,
        end: end,
        className: className ,
        icon:icon,
        classe:session.classe,
        professeurs:session.cours.professeurs
      };
    });
    this.filtreCalendar(); // Appel de la fonction de filtrage ici
    console.log(this.calendarOptions.events);
  });
}


handleEventClick(event: any) {
  const sessionId = event.event.id;
  // console.log(sessionId);
  
  const session = this.sessions.find(s => s.id ==sessionId);

  if (session) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.data = { session: session,
      startTime: session.heure_debut, 
      endTime: session.heure_fin 
    };
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'custom-modal-container'; 

    const dialogRef = this.dialog.open(ModalSessionComponent, dialogConfig);
  }
}
 
loadSessionsProf() {
  this.profService.getSession().subscribe((data: any) => {
    this.sessions = data.data;
console.log(this.sessions);

    this.calendarOptions.events = this.sessions.map(session => {
      let icon: string;
      let sessionTitle: string;
      let start: string;
      let end: string;
      let className: string;
    let professeur:string
      if (session.mode === 'en_ligne') {
        icon = 'fa-calendar'; 
        sessionTitle = 'Session en ligne';
      } else  {
        icon = 'fa-map-marker'; 
        sessionTitle = 'Session en présentiel';
      }

      start = `${session.date}T${session.heure_debut}`;
      end = `${session.date}T${session.heure_fin}`;

      // Déterminez la classe CSS en fonction de l'état de la session
      if (session.etat === 'annuler') {
        className = 'session-annulee';
      } else if (session.etat === 'attente') {
        className = 'session-passee';
      } else  {
        className = 'session-valide'; 
      }

      return {
        id: session.id,
        title: sessionTitle,
        start: start,
        professeur:session.professeur,
        end: end,
        className: className ,
        icon:icon,
        classe:session.classe,
        professeurs:session.cours.professeurs
      };
    });
    this.filtreCalendar(); // Appel de la fonction de filtrage ici
    console.log(this.calendarOptions.events);
  });
}

  
}