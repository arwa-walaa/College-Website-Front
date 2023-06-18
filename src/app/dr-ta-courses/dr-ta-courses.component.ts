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
  constructor(private router: Router,private _AuthService:AuthService,
    private profAndTa:ProfessorAndTaService) {}
  navigateToGpRequest() {
    this.router.navigate(['gp_requests']);
  }

  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.getCourses(ProfessorData[0].professorId)
    });

    /////////////////////

    this._AuthService.getType(token).subscribe((userType:any ) => {
      if (userType && userType.length > 0) {
        const userTypeValue = userType[0].Type;
        console.log("usertype", userTypeValue);
    
        if (userTypeValue === "Professor") {
          this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {  
            if (ProfessorData && ProfessorData.length > 0) {
              this.getCourses(ProfessorData[0].professorId)
              console.log('prof data',this.getCourses(ProfessorData[0].professorId));
            } else {
              console.error("ProfessorData is empty or null");
            }
          });
        } else if (userTypeValue === "TA") {
          this.profAndTa.getTAInfo(token).subscribe((TAData:any ) => {   
            if (TAData && TAData.length > 0) {
              this.getTACourses(TAData[0].TAId);
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

  navigateToSelectedCourse(courseName: string, courseID: string) {
   
    this.router.navigate(['/course_info'], { queryParams: {courseID: courseID, courseName: courseName} });
  
  }

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
    this.router.navigate(['course_info'],{ queryParams: d  });
  }
 

  
}
