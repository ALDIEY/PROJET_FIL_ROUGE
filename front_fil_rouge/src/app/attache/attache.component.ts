import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attache',
  templateUrl: './attache.component.html',
  styleUrls: ['./attache.component.css']
})
export class AttacheComponent implements OnInit{
  constructor(private authService:AuthService,private router:Router ){}
ngOnInit(): void {
  
}

deconnexion(): void {
  this.authService.logout();
}
}
