import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { 
  isActive = false; 
  search = new FormControl();
  ngOnInit() {
    this.search.valueChanges
    .pipe(tap(e => console.log(e)))
    .subscribe()
  }
   
}
