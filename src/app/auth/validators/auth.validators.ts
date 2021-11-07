import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AuthValidators {
    static containsEnglishOnly(control: AbstractControl): ValidationErrors | null{
        const val = control.value;
        const myRegex = /^[a-zA-Z]*$/i;
        if (!myRegex.test(val)) {
          return { containsEnglishOnly: true };
        }
        return null;
    }
    static validateCpass(control: AbstractControl): ValidationErrors | null {
        const { password, 'c-password': cpassword} = control.value;
        if(password !== cpassword){
            return { passwordDisMatch: true }
        }
        return null;
    }
}