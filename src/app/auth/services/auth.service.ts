import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthRes, AuthUser } from '../model/auth-user.model';
import { NotificationToggleService } from 'src/app/shared/notifications/services/notification-toggle.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private router:Router, private notifications: NotificationToggleService) { }
  private $authProcessing = new BehaviorSubject<boolean>(false);
  private $user = new BehaviorSubject<User | null>(null);
  public authProcessing$ = this.$authProcessing.asObservable();
  public user$ = this.$user.asObservable();
  public userName$ = this.user$.pipe(
    map(user => {
      if(user)
        return user.displayName;
      return '';
    }),
  )

  timer: any;

  signup(user: AuthUser): void {
    this.http.post<AuthRes>(environment.auth('signUp'), {
        ...user,
        returnSecureToken: true
    })
    .pipe(tap(user => { 
      this.handleAuthentification(
        user.email,
        user.displayName,
        user.localId,
        user.idToken,
        +user.expiresIn
      )
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
      this.$authProcessing.next(false);
    }))
    .subscribe(_ => { }, _ => {
      this.notifications.toggleNotification('Failed to login');
      this.$authProcessing.next(false);
    });
  }
  
  login(user: AuthUser){ 
    this.http.post<AuthRes>(environment.auth('signInWithPassword'), {
      ...user,
      returnSecureToken: true
  })
  .pipe(
    tap(user => { 
    this.handleAuthentification(
      user.email,
      user.displayName,
      user.localId,
      user.idToken,
      +user.expiresIn
    )
    this.router.navigate(['/']);
    this.$authProcessing.next(false);
  }))
  .subscribe(_ => {}, _ => {
    this.notifications.toggleNotification('Failed to login');
    this.$authProcessing.next(false);
  });
  }

  handleAuthentification(email: string, displayName: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const currUser = new User(email, id, displayName, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(currUser));

    this.timer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000)

    this.$user.next(currUser);
  }

  autoLogin() {
    const userData: {
      email: string, 
      id: string, 
      displayName: string, 
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!);

    if(!userData){
      return;
    }
    
    const loadedUser = new User(userData.email, userData.id, userData.displayName, userData._token, new Date(userData._tokenExpirationDate))
    
    if(!loadedUser.token){
      localStorage.removeItem('userData');
      return;
    }
    
    this.$user.next(loadedUser);

    const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.timer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  logout() {
    this.$user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth'])
  }

  ngOnDestroy(){
    clearTimeout(this.timer)
  }

  authStarted(){
    this.$authProcessing.next(true);
  }
}
