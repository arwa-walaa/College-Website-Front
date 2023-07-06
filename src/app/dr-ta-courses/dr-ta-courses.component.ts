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
    // this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
    //   if(ProfessorData[0]){
    //     this.getCourses(ProfessorData[0].professorId)
    //   }
     
    // });
    // this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
    //   if (ProfessorData && ProfessorData.length > 0) {
    //     this.getCourses(ProfessorData[0].professorId);
    //   } else {
    //     console.error("ProfessorData is empty or null");
    //   }
    // });

    /////////////////////

    this._AuthService.getType(token).subscribe((userType:any ) => {
      if (userType && userType.length > 0) {
        const userTypeValue = userType[0].Type;
        console.log("usertype", userTypeValue);
    
        if (userTypeValue === "Professor") {
          this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {  
            if (ProfessorData && ProfessorData.length > 0) {
              this.getCourses(ProfessorData[0].professorId)
              this.teacherId = ProfessorData[0].professorId; 
              console.log('prof data',this.getCourses(ProfessorData[0].professorId));
            } else {
              console.error("ProfessorData is empty or null");
            }
          });
        } else if (userTypeValue === "TA") {
          this.profAndTa.getTAInfo(token).subscribe((TAData:any ) => {   
            if (TAData && TAData.length > 0) {
              this.getTACourses(TAData[0].TAId);
              this.teacherId = TAData[0].TAId; 
              console.log('Ta course',this.getTACourses(TAData[0].TAId));
            } else {
              console.error("TAData is empty or null");
            }
          });
        } else {
          console.error("Unknown userType: " + userTypeValue);
        }
      } else {
        console.error("userType is empty or null");
      }
    });
    /////////////////////

  }

  navigateToCurrentGPs() {
    this.router.navigate(['/DrTaCurrentGPs'], { queryParams: { teacherId: this.teacherId} });
  }

  // navigateToSelectedCourse(courseName: string, courseID: string) {
   
  //   this.router.navigate(['/course_info'], { queryParams: {courseID: courseID, courseName: courseName} });
  
  // }

  getCourses(professorId:any)
  {
    this.profAndTa.getMyCourses(professorId).subscribe(
      response => {
        this.myCourses=response;
        console.log('Courssssssssss',this.myCourses);
    
    },
    error => {
      console.error('Error!', error);
      
      
    });
  }

  getTACourses(TAId:any)
  {
    this.profAndTa.getTACourses(TAId).subscribe(
      response => {
        this.myCourses=response;
        console.log('Courssssssssss',this.myCourses);
    
    },
    error => {
      console.error('Error!', error);   
    });
  }

  navigateToCourse(d:any) {
    console.log('course dataaaaa==',d);
    this.router.navigate(['course_info'],{ queryParams: d  });
  }
 

  
}
