import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(user: AuthUser): void {
    this.http.post(environment.auth('signUp'), {
        ...user,
        returnSecureToken: true
    }).subscribe(e => console.log(e));
  }
  
  login(user: AuthUser){ 
    this.http.post(environment.auth('signInWithPassword'), {
      ...user,
      
      returnSecureToken: true
  }).subscribe(e => console.log(e));
  }

}

interface loginUser{

}

interface AuthUser {
  displayNam?: string;
  email: string;
  password: string;
}

interface AuthRes {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
}