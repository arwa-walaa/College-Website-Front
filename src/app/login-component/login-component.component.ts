import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})


export class LoginComponentComponent implements OnInit {

  public error: any;
  isLogin: any;
  token: any;

  constructor(private router: Router, private _AuthService: AuthService, private profAndTa: ProfessorAndTaService) { }
  ngOnInit(): void {
    const loggedIn = localStorage.getItem('loggedIn');
  
    // if the user has just logged in, reload the page to prevent caching issues
    if (loggedIn) {
      localStorage.removeItem('loggedIn'); // remove the flag from local storage
      window.location.reload();
    }
  }

  password: any;
  public loginForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.pattern(/^([a-zA-Z]+)|([1-9][0-9]{7})$/), Validators.required]),
    password: new FormControl(null, [Validators.pattern('^([a-z]{3,8})([0-9]{3,5})'), Validators.required])
  })

  handleError(error: any) {
    this.error = error.error.error;
  }

//   onSubmit(loginForm: FormGroup) {

//     // if is a student
//     if (loginForm.valid) {
//       this._AuthService.login(loginForm.value).subscribe(
//         response => {

//           if (response && !('error' in response)) {

//             // const token = ; // assuming the server's response includes the token as a property named 'token'
//             this._AuthService.setToken(response.access_token); // store the token in local storage
//             const token = this._AuthService.getToken();
//             // alert(response.access_token);
//             //if(/([1-9][0-9]{7})$/.test(loginForm.get('name')?.value))
//             this.profAndTa.getUserType(token).subscribe((type: any) => {
//               if (type[0].Type === "Professor" || type[0].Type === "TA") {
//                 // this.router.navigate(['/drTaHome']);
//                 const navigationExtras: NavigationExtras = {
//                   queryParams: {
//                     skipLocationChange: true
//                   }
//                 };
//                 this.router.navigate(['/drTaHome'], navigationExtras);


//               }
//               else if (type[0].Type === "Student") {
                
//                 this.router.navigate(['/home_login']);
//               }
//               else if (type[0].Type === "Admin") {
//                 this.router.navigate(['/home_admin'] );
                
                
                
//               }

//             });
            

//           }

          
        
// },
// error => {
//   // Handle the error
//   this.isLogin = false;
//   console.error(error);
//   this.error = "Username or Password doesn\'t exist";
// }
     
      
//     );
//   }
// }


onSubmit(loginForm: FormGroup) {
  // if is a student
  if (loginForm.valid) {
    this._AuthService.login(loginForm.value).subscribe(
      response => {
        if (response && !('error' in response)) {
          this._AuthService.setToken(response.access_token); // store the token in local storage
          const token = this._AuthService.getToken();

          if (token) { // check if the token is valid
            this.profAndTa.getUserType(token).subscribe((type: any) => {
              if (type[0].Type === "Professor" || type[0].Type === "TA") {
                const navigationExtras: NavigationExtras = {
                  queryParams: {
                    skipLocationChange: true
                  }
                };
                this.router.navigate(['/drTaHome'], navigationExtras);
              }
              else if (type[0].Type === "Student") {
                this.router.navigate(['/home_login']);
              }
              else if (type[0].Type === "Admin") {
                this.router.navigate(['/home_admin']);
              }
            });
            localStorage.setItem('loggedIn', 'true'); // set the flag in local storage
          }
        }
      },
      error => {
        // Handle the error
        this.isLogin = false;
        console.error(error);
        this.error = "Username or Password doesn\'t exist";
      }
    );
  }
}
navigateToForgotPassword() {
  this.router.navigate(['forgetPassword']);
}
    

  
}
