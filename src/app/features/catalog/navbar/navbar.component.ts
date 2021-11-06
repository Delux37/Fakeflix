import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isActive = false; 
  dropdownShown = true;
  search = new FormControl();
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
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
   
}
