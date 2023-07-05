import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css']
})
export class ViewStudentProfileComponent {
  StudentData:any
  constructor(private route: ActivatedRoute,private router: Router,
    private profAndTa: ProfessorAndTaService,
    private _AuthService: AuthService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.StudentData=params
      console.log("this.StudentData",this.StudentData)
     }); 
  }
  navigateToStudentGrades(){
    this.router.navigate(['registerdCoursesAndResults'],{ queryParams: this.StudentData  });

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

}
