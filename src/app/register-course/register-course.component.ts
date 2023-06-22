import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {
  CourseInfo:any=""
  semester:any='Second'
  // StudentData: any[]=[];
  s:any
  selectedCourses: any[] = [];
  constructor(private router: Router, private studendService: StudentsService,private _AuthService:AuthService) {
   
  } 
  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe((StudentData:any ) => {
      // console.log("<<<<",token)

      this.getStudentData(StudentData[0].level,StudentData[0].studentId,StudentData[0].departmentCode,
      this.semester)
      
      // this.getStudentData('Second Level',20190022,'CS',this.semester)
      // console.log(StudentData)
    });
  }
  getStudentData(level:any,id:any,department:any,semester:any){
    this.studendService.getCoursesForStudent(level,id,department,semester)
    .subscribe({
      next:(response)=>{
        this.CourseInfo=response
        console.log("courses",this.CourseInfo)
      }
     

    });
   }
  checkboxSelected(value: any) {
    if (this.selectedCourses.includes(value)) {
      // If the value already exists in the array, remove it
      this.selectedCourses.splice(this.selectedCourses.indexOf(value), 1);
    } else {
      // Otherwise, add it to the array
      this.selectedCourses.push(value);
    }
    console.log("==============",this.selectedCourses)
  }

  navigateToStudentGroupSelection()
  {
   
    this.router.navigate(['studentGroupSelection'], { queryParams: this.selectedCourses  });
  }
}

