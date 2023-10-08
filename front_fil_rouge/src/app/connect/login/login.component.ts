import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
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
    console.log('sava');
    
    localStorage.setItem('token', response.token);
    // Redirection vers la page d'accueil ou autre logique après connexion réussie
  }, error => {
    console.error('Erreur lors de la connexion :', error);
    // Gérer les erreurs de connexion ici
  });
}
}
