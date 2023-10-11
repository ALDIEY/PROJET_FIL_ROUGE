import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ModalSessionComponent } from '../modal/modal-session/modal-session.component'; // Assurez-vous d'ajuster le chemin du composant du modal
import { ApiService } from '../service/resposable.service';
import { Session } from '../cours';
import { MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  sessions:any[]=[]
  constructor(private apiService:ApiService,private dialog: MatDialog){}
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
    this.loadSessions()
    this.filtreCalendar()
      // this.calendarOptions = {
    //   initialView: 'dayGridMonth',
    //   events: this.sessions.map(session => ({
    //     title: 'Session',  // Titre de l'événement
    //     start: session.date,  // Date de début de l'événement (à ajuster selon votre structure de données)
    //     end: session.date,    // Date de fin de l'événement (à ajuster selon votre structure de données)
    //     // Autres propriétés d'événement que vous voulez afficher dans le calendrier
    //   }))
    // };
  }
  
// Service


filtreCalendar(): void {
  this.calendarOptions.initialView = 'dayGrid' + this.view;
}

 // Component

 loadSessions() {
  this.apiService.getSession().subscribe((data: any) => {
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


handleEventClick(event: any) {
  const sessionId = event.event.id;
  console.log(sessionId);
  
  const session = this.sessions.find(s => s.id ==sessionId);

  if (session) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.data = { session: session,
      startTime: session.heure_debut, // Passer l'heure de début au modal
      endTime: session.heure_fin // Passer l'heure de fin au modal
    };
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'custom-modal-container'; // Ajoutez une classe de conteneur personnalisée

    const dialogRef = this.dialog.open(ModalSessionComponent, dialogConfig);
  }
}



  
  
  
  
  
}