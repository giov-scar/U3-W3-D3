import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { IRegister } from '../models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData:IRegister = {
    name: '',
    surname: '',
    email: '',
    password: 'password'
  }

  constructor(
    private authSvc:AuthService,
    private router:Router){}

  register(){
    this.authSvc.register(this.formData)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['/home'])
    })
  }

}
