import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistreComponent} from './registre/registre.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  
  ],
  exports: [RouterModule,FormsModule,MatFormFieldModule, MatInputModule,]
})
export class ConnectModule { }
