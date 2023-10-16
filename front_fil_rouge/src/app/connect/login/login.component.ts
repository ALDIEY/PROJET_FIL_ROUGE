import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup
  userdata: any;
  constructor(private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router ){
     this.loginForm = this.builder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]}


)}
ngOnInit(): void {
  
}

processLogin() {
  const credentials = {
    login: this.loginForm.get('login')?.value,
    password: this.loginForm.get('password')?.value
  };

  this.service.login(credentials).subscribe(response => {
    console.log(response);
    this.userdata=response
if (this.userdata.login==this.loginForm.value.login) {
 
}
else{
this.toastr.error('invalide')
}
    localStorage.setItem('token', response.token);

    localStorage.setItem('user', JSON.stringify(response.user));
//     if (response.user.role=='responsable') {
//   this.router.navigateByUrl("responsable")

// }
if (response.user.role=='professeur') {
  this.router.navigateByUrl("professeur")
}
if (response.user.role=='responsable') {
  this.router.navigateByUrl("voirsession")
}
if (response.user.role=='attache') {
  this.router.navigateByUrl("voirsession")
}
  }, error => {
    console.error('Erreur lors de la connexion :', error);
  });
}

}
