import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { ToastrService } from 'ngx-toastr';
import { CalendarEvent } from 'angular-calendar';
import { Session } from '../../model/session';
import { DatePipe } from '@angular/common';
import { CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ajoutrespo',
  templateUrl: './ajoutrespo.component.html',
  styleUrls: ['./ajoutrespo.component.css']
})
export class AjoutrespoComponent  implements OnInit{
  viewDate: Date = new Date(); 
  showModal: boolean = false;
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  nouvelleAnnee: string = '';
  constructor(private apiService: ApiService, private toastr: ToastrService,private datePipe: DatePipe) {}classes: any[] = [];
  professeurs: any[] = [];
  ngOnInit(): void {
    this.fetchClasses();
    this.fetchProfesseurs();
    // this.creeAnnee(valeur:string);
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  ajouterAnnee(nouvelleAnnee: string) {
    console.log(this.nouvelleAnnee);
    
    this.apiService.createAnnee(nouvelleAnnee).subscribe(
      (response) => {
        console.log('L\'année a été créée avec succès :', response);
        this.toastr.success('L\'année a été ajoutée avec succès', 'Succès');
        this.showModal=false 
        // La notification de succès sera affichée sur votre écran
      },
      (error) => {
        console.error('Erreur lors de la création de l\'année :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout de l\'année', 'Erreur');
        // La notification d'erreur sera affichée sur votre écran
      }
    );
  }
  

  fetchClasses() {
    this.apiService.getClasses().subscribe((data) => {
      this.classes = data;
    });
  }

  fetchProfesseurs() {
    this.apiService.getProfesseurs().subscribe((data) => {
      this.professeurs = data;
    });
  }


  dayClicked({ day, sourceEvent }: { day: CalendarMonthViewDay<any>; sourceEvent: MouseEvent | KeyboardEvent }): void {
    const formattedDate = this.formatDate(day.date);
    this.apiService.getSessionsByDate(formattedDate).subscribe(sessions => {
      this.events = sessions.map(session => {
        return {
          title: session.mode,
          start: new Date(session.date + ' ' + session.heure_debut),
          end: new Date(session.date + ' ' + session.heure_fin),
        };
      });
    });
}


  

  private formatDate(date: Date): string {
    // Formatez la date au format YYYY-MM-DD pour la requête API
    // Utilisez Angular DatePipe pour formater la date
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  
}

