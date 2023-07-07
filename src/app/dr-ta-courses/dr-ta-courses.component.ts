import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dr-ta-courses',
  templateUrl: './dr-ta-courses.component.html',
  styleUrls: ['./dr-ta-courses.component.css']
})
export class DrTaCoursesComponent {
  myCourses: any;
  teacherId: any;
  loggedInUserInfo:any;
  constructor(private router: Router,private _AuthService:AuthService,
    private profAndTa:ProfessorAndTaService) {}
  navigateToGpRequest() {
    this.router.navigate(['gp_requests']);
  }
  navigateToHome(){
    const token = this._AuthService.getToken();

          if (token) { // check if the token is valid
            this.profAndTa.getUserType(token).subscribe((type: any) => {
              if (type[0].Type === "Professor" || type[0].Type === "TA") {
                
                this.router.navigate(['/drTaHome']);
              }
              else if (type[0].Type === "Student") {
                this.router.navigate(['/home_login']);
              }
              else if (type[0].Type === "Admin") {
                this.router.navigate(['/home_admin']);
              }
            });
            // localStorage.setItem('loggedIn', 'true'); // set the flag in local storage
          }
    // this.router.navigate(['home_login']); 
  }
  
  
  ngOnInit(): void {
     const token=this._AuthService.getToken();
   

     this._AuthService.getUserInfo(token).subscribe((loggedInUserInfo:any ) => {
      
      this.loggedInUserInfo = loggedInUserInfo
     console.log("loggedInUserInfo", this.loggedInUserInfo);
   
     
    this.getCourses(this.loggedInUserInfo[0].logginUserID);
    
 
  });
    /////////////////////

  }
  getCourses(teacherId: any)
  {
       this.profAndTa.getMyCourses(teacherId).subscribe({
        next:(response)=> this.myCourses=response
        
      });
  }

  navigateToCurrentGPs() {
    this.router.navigate(['/DrTaCurrentGPs'], { queryParams: { teacherId: this.loggedInUserInfo[0].logginUserID} });
  }


  

  navigateToCourse(d:any) {
    console.log('course dataaaaa==',d);
    this.router.navigate(['course_info'],{ queryParams: d  });
  }
 

  
}
