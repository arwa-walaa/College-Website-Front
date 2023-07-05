import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dr-ta-current-gps',
  templateUrl: './dr-ta-current-gps.component.html',
  styleUrls: ['./dr-ta-current-gps.component.css']
})
export class DrTaCurrentGPsComponent {

  teacherId:any;
  currentGPs:any;
  public showData = true;

  constructor(private router: Router,
  
    private profAndTa:ProfessorAndTaService ,
    private _AuthService:AuthService,
    private http: HttpClient,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const test = params['teacherId'];
        this.teacherId = test;       
        console.log('Teacher Id:', test);
      });
      this.returnTeacherGPs(this.teacherId);
     }
     
     navigateToMyCourses() {
      this.router.navigate(['drTaCourses']);
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
     returnTeacherGPs(teacherId:any)
     {
      this.profAndTa.returnTeacherGPs(teacherId)
      .subscribe(
        response => {
          this.currentGPs=response;
          console.log('Current GPs',this.currentGPs);
      },
      error => {
        console.error('Error!', error);   
      });
     }

     navigateToStudent(studentID: any) {
      this.profAndTa.getStudentData(studentID).subscribe((studentData:any ) => {
        console.log('studentData[0]',studentData[0])
       
        this.router.navigate(['/ViewStudentProfile'], { queryParams: studentData[0]} );
      
      });
     
    }


}
