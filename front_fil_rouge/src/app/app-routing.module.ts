import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectModule } from "../app/connect/connect.module";

import { ResponsableComponent } from './responsable/responsable.component';
import { AjoutrespoComponent } from './responsable/ajoutrespo/ajoutrespo.component'; // Assurez-vous d'importer le composant enfant ici
import { LiistercourComponent } from './responsable/liistercour/liistercour.component';
import { PlanifiercourComponent } from "./planifiercour/planifiercour.component";
const routes: Routes = [
  { path: 'responsable', component: ResponsableComponent },
  { path: 'ajoutrespo', component: AjoutrespoComponent },
  { path: 'listercour', component: LiistercourComponent },
  { path: 'planifierCour', component:  PlanifiercourComponent },


  { path: 'connect', loadChildren: () => import('./connect/connect.module').then(m => m.ConnectModule) }
  // { path: 'ajoutrespo', component: AjoutrespoComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ResponsableRoutingModule { }
