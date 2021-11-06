import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
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
