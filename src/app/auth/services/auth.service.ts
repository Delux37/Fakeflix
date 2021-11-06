import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(user: AuthUser): void { 
    delete user.name;
    this.http.post(environment.auth('signUp'), {
        ...user,
        returnSecureToken: true
    }).subscribe(e => console.log(e));
  }
  
  login(){  }

}

interface loginUser{

}

interface AuthUser {
  name?: string;
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