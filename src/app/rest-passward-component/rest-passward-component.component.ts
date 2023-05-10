import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { MatPasswordStrengthComponent } from "@angular-material-extensions/password-strength";
import { AuthService } from '../auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-rest-passward-component',
  templateUrl: './rest-passward-component.component.html',
  styleUrls: ['./rest-passward-component.component.css']
})
export class RestPasswardComponentComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router, private _AuthService:AuthService){
    route.queryParams.subscribe(params => {
      this.ResetPassword.controls['resetToken'].setValue(
        params['token']
      );
    });
   
  }
  error:any= null;

  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
  
  ResetPassword:FormGroup = new FormGroup({
  resetToken:new FormControl (null),
  email: new FormControl (null,[Validators.required]),
  password: new FormControl (null,[Validators.pattern('^([a-z]{3,8})([0-9]{3,5})'),Validators.required]),
  password_confirmation: new FormControl (null,[Validators.pattern('newPassword'),Validators.required]),
  
  
}
,
[RestPasswardComponentComponent.MatchValidator('password', 'password_confirmation')]

);
get passwordMatchError() {
  return (
    this.ResetPassword.getError('mismatch') 
    &&
    this.ResetPassword.get('confirmPassword')?.touched
  );
}
  
token: any;
ngOnInit(): void {
 
}
  
 

  onSubmit() {
    this._AuthService.resetPassword(this.ResetPassword.value).subscribe(
      (result) => {
        alert('Password has been updated');
        this.ResetPassword.reset();
        this.router.navigate(['/home_login']);
      },
      (error) => {
       console.error(error);
        this.error = "Email doesn\'t exist";
      }
      
     
    );
  }
 

 

}
