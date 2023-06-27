import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-course-evaluation',
  templateUrl: './course-evaluation.component.html',
  styleUrls: ['./course-evaluation.component.css']
})
export class CourseEvaluationComponent implements OnInit  {
  userTypeValue: any;
  
  StudentID: any;
  courses: any;
  constructor(
    private stdService: StudentsService,
    private _AuthService: AuthService,
    private router: Router) {}

  public selected:any = [];

  ngOnInit(): void {
    const token = this._AuthService.getToken();
  
          this.stdService.getStudentInfo(token).subscribe((StudentData: any) => {
            if (StudentData && StudentData.length > 0) {
              this.StudentID=StudentData[0].studentId;
              this.getStudentCourses( this.StudentID);
              console.log('StudentID',this.StudentID);
            } else {
              console.error("Student data is empty or null");
            }
          }
         
          );
       
  }
 
  getStudentCourses(studID:any){
    this.stdService.getStudentCourses(studID).subscribe((studCourses: any) => {
      if (studCourses && studCourses.length > 0) {
       this.courses=studCourses;
        console.log('studCourses',studCourses);
      } else {
        console.error("studCourses  are empty or null");
      }
    }
   
    );

  }
  navigateToEvaluateCourse(courseName: string, courseID: string) {
   
  
    // Navigate to the course evaluation page

    // this.courses = this.courses.filter(course => course.courseID !== courseID);
    // this.selected = this.courses;
    // alert(this.selected[0].courseName);
    this.router.navigate(['/CourseFormEvaluation'], { queryParams: { courseName: courseName, courseID: courseID} });
  
  }



}