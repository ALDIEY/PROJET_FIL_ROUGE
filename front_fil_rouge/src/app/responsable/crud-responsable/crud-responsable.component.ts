import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { ToastrService } from 'ngx-toastr';
import { CalendarEvent } from 'angular-calendar';
import { Session } from '../../model/session';
import { DatePipe } from '@angular/common';
import { CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from 'src/app/responsable/crud-responsable/ajoutannee/ajoutannee.component';
import { AjoutprofComponent } from './ajoutprof/ajoutprof.component';
import { AjoutsalleComponent } from './ajoutsalle/ajoutsalle.component';
import { AjoutmoduleComponent } from './ajoutmodule/ajoutmodule.component';
import { AjoutsemestreComponent } from './ajoutsemestre/ajoutsemestre.component';
@Component({
  selector: 'app-crud-responsable',
  templateUrl: './crud-responsable.component.html',
  styleUrls: ['./crud-responsable.component.css']
})
export class CrudResponsableComponent implements OnInit {
  viewDate: Date = new Date(); 
  showModal: boolean = false;
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  nouvelleAnnee: string = '';
  constructor(private apiService: ApiService, private toastr: ToastrService,private datePipe: DatePipe,private dialog: MatDialog) {}classes: any[] = [];
  professeurs: any[] = [];
  ngOnInit(): void {
    // this.fetchClasses();
    // this.fetchProfesseurs();
    // this.creeAnnee(valeur:string);
  }


  openModal() {
    this.showModal = true;
  }

  // closeModal() {
  //   this.showModal = false;
  // }


  

 


 


  

  private formatDate(date: Date): string {
    // Formatez la date au format YYYY-MM-DD pour la requête API
    // Utilisez Angular DatePipe pour formater la date
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  ouvrirModalAjoutAnnee() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermée', result);
      // Traitez le résultat de la modal ici si nécessaire
    });
  }
  ouvrirModalAjoutProfd() {
    const dialogRef = this.dialog.open(AjoutprofComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermée', result);
      // Traitez le résultat de la modal ici si nécessaire
    });
  }
  ouvrirModalAjoutSalle() {
    const dialogRef = this.dialog.open(AjoutsalleComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermée', result);
      // Traitez le résultat de la modal ici si nécessaire
    });
  }
  ouvrirModalAjoutModule() {
    const dialogRef = this.dialog.open(AjoutmoduleComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermée', result);
      // Traitez le résultat de la modal ici si nécessaire
    });
  }
  ouvrirModalAjoutSemestre() {
    const dialogRef = this.dialog.open(AjoutsemestreComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermée', result);
      // Traitez le résultat de la modal ici si nécessaire
    });
  }
  // ...

// Variables pour contrôler la visibilité des modals


// ...

  
}
