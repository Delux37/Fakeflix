import { AuthValidators } from './../validators/auth.validators';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading = true;
  form = new FormGroup({
    'name': new FormControl(null, [Validators.required, AuthValidators.containsEnglishOnly]),
    'email': new FormControl(null, [Validators.email, Validators.required]),
    'passGroup': new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
      'c-password': new FormControl(null, Validators.required)
    }, { validators: AuthValidators.validateCpass })
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
