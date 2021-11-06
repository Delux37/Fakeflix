import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) { }
  private authentificatedUser!: AuthRes;

  signup(user: AuthUser): void {
    this.http.post<AuthRes>(environment.auth('signUp'), {
        ...user,
        returnSecureToken: true
    })
    .pipe(tap(user => { 
      this.authentificatedUser = user;
      this.router.navigate(['/']);
    }))
    .subscribe();
  }
  
  login(user: AuthUser){ 
    this.http.post<AuthRes>(environment.auth('signInWithPassword'), {
      ...user,
      returnSecureToken: true
  })
  .pipe(tap(user => { 
    this.authentificatedUser = user 
    this.router.navigate(['/']);
  }))
  .subscribe();
  }

  getDisplayname(){
    return this.authentificatedUser?.displayName;
  }
}
interface AuthUser {
  displayName?: string;
  email: string;
  password: string;
}

interface AuthRes {
  displayName: string;
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
}