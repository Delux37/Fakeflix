import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'passGroup': new FormGroup({
      'password': new FormControl(),
      'c-password': new FormControl()
    })
  })

  onSubmit() {
    const user = {
      displayName: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('passGroup.password')?.value
    }
    this.authService.signup(user);
  }
  constructor(private authService: AuthService) {}
}
