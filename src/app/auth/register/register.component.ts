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
    console.log(this.form);
  }
  constructor() {}
}
