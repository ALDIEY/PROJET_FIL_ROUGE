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
import { SessionComponent } from './attache/session/session.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ModalSessionComponent } from './modal/modal-session/modal-session.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { InscriptionComponent } from './responsable/inscription/inscription.component';
import { ModalSessionProfComponent } from './modal/modal-session-prof/modal-session-prof.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SimplePaginatorDirective } from './paginate.directive';
import { HomeprofComponent } from './professeur/homeprof/homeprof.component';
import { AttacheComponent } from './attache/attache.component';
import { SessionAttacheComponent } from './session-attache/session-attache.component';

const routes: Routes = [
  
  { path: 'etudiants/:id', component: InscriptionComponent },
     { path: '',
    canActivate: [AuthGuard], }
    // loadChildren: () => import('./path-to-your-lazy-loaded-module/lazy-loaded.module').then(m => m.LazyLoadedModule)
  
  // ... vos autres routes
];
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
    InscriptionComponent,
    ModalSessionProfComponent,
    SimplePaginatorDirective,
    HomeprofComponent,
    AttacheComponent,
    SessionAttacheComponent    // Déclarez ResponsableComponent ici
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
    MatTableModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MaterielModule,
    ToastrModule.forRoot(),
    MatPaginatorModule
  ],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
