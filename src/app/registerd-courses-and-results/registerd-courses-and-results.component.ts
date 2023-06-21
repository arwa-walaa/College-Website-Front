import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registerd-courses-and-results',
  templateUrl: './registerd-courses-and-results.component.html',
  styleUrls: ['./registerd-courses-and-results.component.css']
})
export class RegisterdCoursesAndResultsComponent implements OnInit{
  RegisteredCoursesInfo: any;
  StudentData: any;

  constructor(private router: Router,private studendService: StudentsService,private _AuthService:AuthService) {}
  
  ngOnInit(): void {
     
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe((StudentData:any ) => {
      this.StudentData=StudentData
      this.getRegisteredCourses(StudentData[0].studentId)

    });
  }
  getRegisteredCourses(studentId:any){
    this.studendService.returnCourseResult(studentId).subscribe({
      next:(response)=> this.RegisteredCoursesInfo=response
      
    });
    
   }
  title='Registered Courses & Results';
  data=[
    // {code:"IS422" ,name:"Big Data", group:"S1" ,hours:"3", level:"Four",year:"2019", term:"First",absence:0,termWork:40,examWork:55,result:95,grade:"A+"},
    // {code:"CS566" ,name:"Machine Learning", group:" S5" ,hours:"3", level:"Four",year:"2019", term:"First",absence:0,termWork:40,examWork:55,result:95,grade:"A+"},
    // {code:"IT456" ,name:"Network", group:"S4" ,hours:"3", level:"Four",year:"2019", term:"First",absence:0,termWork:40,examWork:55,result:95,grade:"A+"},
    // {code:"DS467" ,name:"Data Analytics", group:"S1" ,hours:"3", level:"Four",year:"2019", term:"First",absence:0,termWork:40,examWork:55,result:95,grade:"A+"},
    
    
  ]
  searchText='';

  navigateToRegisterCourse()
  {
    this.router.navigate(['register_course']);
  }
  navigateToEvaluateCourses(){
    this.router.navigate(['CourseEvaluation']);
  }
  navigateToSelectSpecializationProgram(){
    this.router.navigate(['program_selection']);
  }
  navigateToRegisterGraduationProject(){
    this.router.navigate(['gpForm']);
  }
 
}
