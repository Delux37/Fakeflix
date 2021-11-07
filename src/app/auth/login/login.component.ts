import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  sub!: Subscription
  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(7)])
  })
  constructor(private authService: AuthService) { }

  onSignIn() {
    if(this.form.valid){
      this.authService.authStarted();
      const user = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      this.authService.login(user);
    }else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit(){
    this.sub = this.authService.authProcessing$.subscribe(val => this.isLoading = val);
  }

  ngOndestroy(){
    this.sub.unsubscribe();
  }

  anonimousSignIn(){
    this.form.markAsUntouched();
    this.authService.authStarted();
    this.authService.login({ email: 'anonimous@gmail.com', password: 'anonimous' })
  }
}
