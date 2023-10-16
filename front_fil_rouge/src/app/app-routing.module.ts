import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectModule } from "../app/connect/connect.module";

import { ResponsableComponent } from './responsable/responsable.component';
import { AjoutrespoComponent } from './responsable/ajoutrespo/ajoutrespo.component'; // Assurez-vous d'importer le composant enfant ici
import { LiistercourComponent } from './responsable/liistercour/liistercour.component';
import { PlanifiercourComponent } from "./responsable/planifiercour/planifiercour.component";
import { GestionclasseComponent } from './responsable/gestionclasse/gestionclasse.component';
import { HomeComponent } from './home/home.component';
import { RegistreComponent } from './connect/registre/registre.component';
import { LoginComponent } from './connect/login/login.component';
import { UserlistinigComponent } from './userlistinig/userlistinig.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { CourprofComponent } from './professeur/courprof/courprof.component';
import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './connect/logout/logout.component';
import { SessionComponent } from './attache/session/session.component';
import { InscriptionComponent } from './responsable/inscription/inscription.component';
import { HomeprofComponent } from './professeur/homeprof/homeprof.component';
import { AttacheComponent } from './attache/attache.component';
const routes: Routes = [
  { path: 'connect', loadChildren: () => import('./connect/connect.module').then(m => m.ConnectModule) },

  //  { path: 'responsable', component: SessionComponent, },
  { path: 'voirsession', component: AjoutrespoComponent , canActivate: [AuthGuard] },
  { path: 'listercour', component: LiistercourComponent , canActivate: [AuthGuard] },
  { path: 'planifierCour', component:  PlanifiercourComponent , canActivate: [AuthGuard]  },
    {path:'gestionclasse', component: GestionclasseComponent   , canActivate: [AuthGuard]  },
  {path:"",component:HomeComponent,canActivate: [AuthGuard]},
  // {path:"register",component:RegistreComponent,canActivate: [AuthGuard] },
  // {path:"login",component:LoginComponent,canActivate: [AuthGuard]},
  {path:"user",component:UserlistinigComponent , canActivate: [AuthGuard] },
  {path:"attache",component:AttacheComponent , canActivate: [AuthGuard] },

  {path:"professeur",component:HomeprofComponent , canActivate: [AuthGuard] },
  {path:"courprof",component:CourprofComponent , canActivate: [AuthGuard] },
   {path: 'etudiants/:id',component:InscriptionComponent,canActivate: [AuthGuard]},
  // { path: 'ajoutrespo', component: AjoutrespoComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ResponsableRoutingModule { }
