import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
@Component({

  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
  
})
export class RegistreComponent {
constructor(private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router ){}
registerform=this.builder.group({
id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
name:this.builder.control('',Validators.required),
password:this.builder.control('',Validators.required),
login:this.builder.control('',Validators.required),
roleId: [''],
inactive:this.builder.control(false)
})
procedregisteration(){
if (this.registerform.valid) {
  this.service.Procedregister(this.registerform).subscribe(res=>{
  this.toastr.success("Utilisateur enrigistrer avec succes")
      
  
  })
}
else{
this.toastr.warning('please enter valide data')
this.router.navigate(['login'])
}

}
}
