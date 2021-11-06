import { AuthService } from './../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(state.url === '/auth/login' || state.url === '/auth/register'){
        return this.authService.user$.pipe(map(user => { 
          const isAuth = !!user;  
          if(!isAuth){
            return true;
          }
          this.router.navigate(['/']);
          return false;
        }))
      }
      
      return this.authService.user$.pipe(map(user => { 
        const isAuth = !!user;  
        if(isAuth){
          return true;
        }
        this.router.navigate(['/auth']);
        return false;
      }))
  }
  
}
