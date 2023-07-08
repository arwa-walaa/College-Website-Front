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
  gpFormStatus: any;
  evaluationFormStatus: any;
  programSelectionStatus:any
  type: any;
  isStudent:any=null
  StudentName: any;

  constructor(private router: Router,private route: ActivatedRoute,private studentService: StudentsService,
    private _AuthService:AuthService ,private _AdminService:AdminService,private profAndTa:ProfessorAndTaService) {}
  
navigateToStudentProfile(){
  this.route.queryParams.subscribe(params => {
    this.StudentData=params
    
  this.router.navigate(['/ViewStudentProfile'],{ queryParams: this.StudentData  });
});
}
navigateToMyCourses(){
  this.router.navigate(['drTaCourses']); 
}
navigateTogp_requests(){
  this.router.navigate(['gp_requests']); 
}
  navigateToHome(){
      const token = this._AuthService.getToken();
  
            if (token) { // check if the token is valid
              this.profAndTa.getUserType(token).subscribe((type: any) => {
                this.type=type
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
    this._AdminService.getAdminControlStatus().subscribe((data: any) => {
      this.gpFormStatus = data[0].GpFormStatus;
      this.evaluationFormStatus = data[0].evaluationStatus;
      console.log("evaluationFormStatus", this.evaluationFormStatus);
    });
  console.log("this.evaluationStatus",this.evaluationStatus)
    const token=this._AuthService.getToken();

    
    this._AdminService.getAdminControlStatus()
    .subscribe(
      response=> {
        this.registerationStatus = response;
        this.programSelectionStatus = response;
        console.log('registerationStatus',this.registerationStatus[0].registerationStatus);
    }
    ,
    error => { 
      console.error(error);  
    });
  

    this.profAndTa.getUserType(token).subscribe((type:any ) => {
      this.type=type
      if(type[0].Type==="Professor" || type[0].Type==="TA"|| type[0].Type==="Admin"){
        this.isStudent=false
        this.route.queryParams.subscribe(params => {
          this.StudentData=[params]
          
          this.getRegisteredCourses(this.StudentData[0].studentId);
          console.log("this.StudentData",this.StudentData[0].studentId)
         });
      }
     
      else if(type[0].Type==="Student"){
       this.isStudent=true
        this.studentService.getStudentInfo(token).subscribe((StudentData:any ) => {
          this.StudentData=StudentData;
          this.getRegisteredCourses(StudentData[0].studentId);  
        });
      }
    
    });
   
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
