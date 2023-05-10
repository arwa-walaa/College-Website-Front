import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  public error :any;
  isLogin:any;
  token:any;
  constructor(private router: Router, private _AuthService:AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  password:any;
  public loginForm:FormGroup = new FormGroup({              
  name: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
  password: new FormControl (null,[Validators.pattern('^([a-z]{3,8})([0-9]{3,5})'),Validators.required])})
  
   

   
    handleError(error:any) {
      this.error = error.error.error;
    }
onSubmit(loginForm: FormGroup) {
  if (loginForm.valid) {
    this._AuthService.login(loginForm.value).subscribe(
      response => {
       
        if (response && !('error' in response)) {
          
          // const token = ; // assuming the server's response includes the token as a property named 'token'
          this._AuthService.setToken(response.access_token); // store the token in local storage
          alert(response.access_token);
          this.router.navigate(['/home_login']);
          
       } 
      //  this._OfficeHoursServiceService.getOfficeHours().subscribe({
      //   next:(response)=>this.tableData =response
      //  })
        // else {
        //   // The response is invalid
        //   this.error = "Username or Password doesn\'t exist";
        // }
      },
      error => {
        // Handle the error
        this.isLogin=false;
        console.error(error);
        this.error = "Username or Password doesn\'t exist";
      }
     
      
    );
  }
}

 
  // ngOnInit(): void {
  //   // throw new Error('Method not implemented.');
    
  // }

 
    //this.router.navigate(['forgotPassword'], {relativeTo:this.route});
    navigateToForgotPassword() {
      this.router.navigate(['forgetPassword']);
    }
    

  
}
