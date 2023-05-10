import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.css']
})
export class ChnagePasswordComponent {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
  
  ChangePassword:FormGroup = new FormGroup({
     
  newPassword: new FormControl (null,[Validators.pattern('^([a-z]{3,8})([0-9]{3,5})'),Validators.required]),
  confirmPassword: new FormControl (null,[Validators.pattern('newPassword'),Validators.required])
  // confirmPassword: new FormControl (null,[Validators.required])
  
}
,
[ChnagePasswordComponent.MatchValidator('newPassword', 'confirmPassword')]

);
get passwordMatchError() {
  return (
    this.ChangePassword.getError('mismatch') 
    &&
    this.ChangePassword.get('confirmPassword')?.touched
  );
}
  
  constructor()
  {
    
  }
 
  ngOnInit(): void {
   
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
}
