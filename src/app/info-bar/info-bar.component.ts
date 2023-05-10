import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { StudentsService } from '../students.service';
  

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css']
})
export class InfoBarComponent {
  isLog:boolean=false;
  isLoggedIn :any;
  authenticated:any;
  StudentData: any;
  // , private _LoginComponentComponent:LoginComponentComponent
  constructor(private _AuthService:AuthService,private studendService: StudentsService) { 
    // if (this._AuthService.getToken()==true) {
    //   // Verify the token with your backend
    //   // If the token is valid, set isLoggedIn to true
    //   this.isLoggedIn = true;
    // }
    // else{
    //   this.isLoggedIn = false;
    // }
    // this.authenticated = !!this._AuthService.getToken();
  }
  ngOnInit(): void {
    // alert(this._AuthService.getToken());
    if(this._AuthService.getToken()){
      this.isLog=true;
      
    }
    
    else{
      this.isLog=false;
    }
    // const authToken = localStorage.getItem('authToken');
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe({
      next:(response)=> this.StudentData=response
      
    });
 
  }

 
    
  
}
