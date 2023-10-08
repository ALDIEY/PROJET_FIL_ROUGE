import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectModule } from "../app/connect/connect.module";

import { ResponsableComponent } from './responsable/responsable.component';
import { AjoutrespoComponent } from './responsable/ajoutrespo/ajoutrespo.component'; // Assurez-vous d'importer le composant enfant ici
import { LiistercourComponent } from './responsable/liistercour/liistercour.component';
import { PlanifiercourComponent } from "./planifiercour/planifiercour.component";
import { PlanifiersessionComponent } from './responsable/planifiersession/planifiersession.component';
import { GestionclasseComponent } from './responsable/gestionclasse/gestionclasse.component';
import { HomeComponent } from './home/home.component';
import { RegistreComponent } from './connect/registre/registre.component';
import { LoginComponent } from './connect/login/login.component';
const routes: Routes = [
  { path: 'responsable', component: ResponsableComponent },
  { path: 'voirsession', component: AjoutrespoComponent },
  { path: 'listercour', component: LiistercourComponent },
  { path: 'planifierCour', component:  PlanifiercourComponent },
  {path:'planifiersession', component: PlanifiersessionComponent      },
  {path:'gestionclasse', component: GestionclasseComponent     },
  {path:"",component:HomeComponent},
  {path:"register",component:RegistreComponent},
  {path:"logn",component:LoginComponent},
  {path:"user",component:HomeComponent}

  { path: 'connect', loadChildren: () => import('./connect/connect.module').then(m => m.ConnectModule) }
  // { path: 'ajoutrespo', component: AjoutrespoComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ResponsableRoutingModule { }
