// app.module.ts
import { ConnectModule } from "../app/connect/connect.module";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResponsableComponent } from './responsable/responsable.component'; // Assurez-vous d'importer ResponsableComponent
import { AjoutrespoComponent } from "./responsable/ajoutrespo/ajoutrespo.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { RegistreComponent } from './connect/registre/registre.component';
import { LiistercourComponent } from './responsable/liistercour/liistercour.component';
import { PlanifiercourComponent } from './planifiercour/planifiercour.component';
@NgModule({
  declarations: [
    AppComponent,
    AjoutrespoComponent,
    ResponsableComponent,
    ModalComponent,
    RegistreComponent,
    LiistercourComponent,
    PlanifiercourComponent, // Déclarez ResponsableComponent ici
  ],
  imports: [
    BrowserModule,
    ConnectModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    
  ],
  providers: [DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
