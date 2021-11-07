import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = true;
  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(7)])
  })
  constructor(private authService: AuthService) { }

  onSignIn() {
    const user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.login(user);
  }
}
