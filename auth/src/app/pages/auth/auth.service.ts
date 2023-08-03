import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegister } from './models/register';
import { HttpClient } from '@angular/common/http';
import { IAccessData } from './models/access-data';
import { ILogin } from './models/login';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper:JwtHelperService = new JwtHelperService()

  url:string = 'http://localhost:3000'
  registerUrl:string = this.url + '/register'
  loginUrl:string = this.url + '/login'

  private authSubject = new BehaviorSubject<null | IAccessData>(null)
  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(map(user => user?.accessToken ? true : false ))

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    console.log(this.isLoggedIn$);

   }

  register(data:IRegister){
    return this.http.post<IAccessData>(this.registerUrl, data)
  }

  login(data:ILogin){
    return this.http.post<IAccessData>(this.loginUrl, data)
    .pipe(tap(data => {
      this.authSubject.next(data)
      localStorage.setItem('accessData', JSON.stringify(data))
    }))
  }

  logout(){
    this.authSubject.next(null)
    localStorage.removeItem('accessData')
    this.router.navigate(['auth/login'])
  }
}
