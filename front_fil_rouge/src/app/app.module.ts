// app.module.ts
import { ConnectModule } from '../app/connect/connect.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './connect/interseptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResponsableComponent } from './responsable/responsable.component'; // Assurez-vous d'importer ResponsableComponent
import { AjoutrespoComponent } from './responsable/ajoutrespo/ajoutrespo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { RegistreComponent } from './connect/registre/registre.component';
import { LiistercourComponent } from './responsable/liistercour/liistercour.component';
import { PlanifiercourComponent } from './responsable/planifiercour/planifiercour.component';
import { PlanifiersessionComponent } from './responsable/planifiersession/planifiersession.component';
import { SalleNonDisponibleModal } from './modal/modal-sall/modal-sall.component';
import { ProfesseurNonDisponibleModal } from './modal/modal-professeur/modal-professeur.component';
import { SuccesModal } from './modal/modal-succes/modal-succes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrudResponsableComponent } from './responsable/crud-responsable/crud-responsable.component';
import { GestionclasseComponent } from './responsable/gestionclasse/gestionclasse.component';
import { MaterielModule } from 'src/materiele.modal';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { UserlistinigComponent } from './userlistinig/userlistinig.component';
import { LoginComponent } from './connect/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { CourprofComponent } from './professeur/courprof/courprof.component';
import { LogoutComponent } from './connect/logout/logout.component';
import { SessionComponent } from './responsable/session/session.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ModalSessionComponent } from './modal/modal-session/modal-session.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
@NgModule({
  declarations: [
    AppComponent,
    AjoutrespoComponent,
    ResponsableComponent,
    ModalComponent,
    RegistreComponent,
    LoginComponent,
    LiistercourComponent,
    PlanifiercourComponent,
    PlanifiersessionComponent,
    SalleNonDisponibleModal,
    ProfesseurNonDisponibleModal,
    SuccesModal,
    CrudResponsableComponent,
    GestionclasseComponent,
    HomeComponent,
    UserlistinigComponent,
    DashboardComponent,
    ProfesseurComponent,
    CourprofComponent,
    LogoutComponent,
    SessionComponent,
    CalendarComponent,
    ModalSessionComponent,
    EtudiantComponent,
    // Déclarez ResponsableComponent ici
  ],
  imports: [
    FullCalendarModule,
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    ConnectModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MaterielModule,
    ToastrModule.forRoot(),
  ],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
