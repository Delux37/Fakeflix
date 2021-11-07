import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isActive = false; 
  dropdownShown = false;
  randomGender = Math.random() > .5 ? 'male' : 'female';
  @HostListener('window:scroll', ['$event'])
    onScroll(_: any) {
      if(window.scrollY > 100){
        if(!this.currState){
          this.isScrolled$.next('scrolled');
          this.currState = 'scrolled'
        }
      }else {
        this.currState = '';
        this.isScrolled$.next('')
      };
    }
  private currState: boolean | string = false;
  isScrolled$ = new BehaviorSubject('');
  search = new FormControl();
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  userName$ = this.authService.userName$;
  ngOnInit() {
    this.router.url.substr(1,6) === 'search' ? this.isActive = true : '';
    const initialVal = this.route.snapshot.queryParams.searchTerm
    initialVal ? this.search.setValue(initialVal) : '';
    this.search.valueChanges
    .pipe(tap(
      val => {
        this.router.navigate(['/search'], {
          queryParams: {
            searchTerm: val
          }
        });
      }
      ))
    .subscribe()
  }
   
  logout() {
    this.authService.logout();
  }


  scroll = (event: any): void => {
    console.log(event)
  };
}
