import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { AdminService } from './../admin.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-registerd-courses-and-results',
  templateUrl: './registerd-courses-and-results.component.html',
  styleUrls: ['./registerd-courses-and-results.component.css']
})
export class RegisterdCoursesAndResultsComponent implements OnInit{
  RegisteredCoursesInfo: any;
  StudentData: any;
  registerationStatus: any;
  evaluationStatus: any;

  constructor(private router: Router,private route: ActivatedRoute,private studentService: StudentsService,
    private _AuthService:AuthService ,private _AdminService:AdminService,private profAndTa:ProfessorAndTaService) {}
  
  ngOnInit(): void {
  this.evaluationStatus= this. _AdminService.EvaluationFormStatus
  console.log("this.evaluationStatus",this.evaluationStatus)
    const token=this._AuthService.getToken();

    this.profAndTa.getUserType(token).subscribe((type:any ) => {
      if(type[0].Type==="Professor" || type[0].Type==="TA"|| type[0].Type==="Admin"){
        this.route.queryParams.subscribe(params => {
          this.StudentData=[params]
          
          this.getRegisteredCourses(this.StudentData[0].studentId);
          console.log("this.StudentData",this.StudentData[0].studentId)
         });
      }
     
      else if(type[0].Type==="Student"){
       
        this.studentService.getStudentInfo(token).subscribe((StudentData:any ) => {
          this.StudentData=StudentData;
          this.getRegisteredCourses(StudentData[0].studentId);
          
    
        });
      }
    
    });


   

    
    this.registerationStatus = this._AdminService.getRegisterationStatus();
    
  }
  getRegisteredCourses(studentId:any){
    this.studentService.returnCourseResult(studentId).subscribe({
      next:(response)=>{
        this.RegisteredCoursesInfo=response
        console.log(" this.RegisteredCoursesInfo", this.RegisteredCoursesInfo)
      }
      
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
