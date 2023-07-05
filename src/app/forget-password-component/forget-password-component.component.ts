import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password-component',
  templateUrl: './forget-password-component.component.html',
  styleUrls: ['./forget-password-component.component.css']
})
export class ForgetPasswordComponentComponent implements OnInit {
  error:any = null;
  successMsg:any = null;
  constructor( private _AuthService:AuthService,private router:Router ){}
  forgotPasswordForm:FormGroup = new FormGroup({

    // id: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
                      
    //11410120190001@stud.cu.edu.eg
  
    // email: new FormControl (null,[Validators.pattern('^114101([1-9]{1})([0-9]{7})+@stud.cu.edu.eg$'),Validators.required])
    email: new FormControl (null,[Validators.required])}) 
  
  
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  navigateToLogin(){
    this.router.navigate(['/login'])

  }
  onSubmit(){
    this._AuthService.sendResetPasswordLink(this.forgotPasswordForm.value).subscribe(
      
      successMsg => {
        if (successMsg && !('error' in successMsg)) {
          // The response is valid
          console.error(successMsg);
          this.successMsg="We have sent an email with a link to set your new password."
         } 
        
      },
      error => {
        // Handle the error
        console.error(error);
        this.error = "Email doesn\'t exist";
      }

      )
  }
}
