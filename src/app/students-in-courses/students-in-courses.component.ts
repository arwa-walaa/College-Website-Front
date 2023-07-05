import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-students-in-courses',
  templateUrl: './students-in-courses.component.html',
  styleUrls: ['./students-in-courses.component.css']
})
export class StudentsInCoursesComponent {
  // constructor(private _OfficeHoursServiceService:OfficeHoursServiceService) {}

  p: number = 1;
  count: number = 5;
  myStudents: any;
  myCourses: any;
  grades:any;
  userTypeValue:any;
  loggedInUserInfo:any;

  constructor(private router: Router,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {} 

  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this._AuthService.getUserInfo(token).subscribe((loggedInUserInfo:any ) => {
      
        this.loggedInUserInfo = loggedInUserInfo
       console.log("loggedInUserInfo", this.loggedInUserInfo);
       this.getMyStudents(this.loggedInUserInfo[0].logginUserID);
       
      this.getCourses(this.loggedInUserInfo[0].logginUserID);
      this.getGrades(this.loggedInUserInfo[0].logginUserID);
   
    });
    
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

  searchText='';

  getMyStudents(teacherId:any)
  {
    this.profAndTa.getMyStudents(teacherId).subscribe(
      response => {
        this.myStudents=response;
        console.log('id',teacherId);
        console.log('myStudents',this.myStudents);
    },
    error => {
      console.error('Error!', error);   
    });
  }
getGrades(teacherId: any){
  this.profAndTa.getGrades(teacherId).subscribe({
    next:(response)=> this.grades=response
    
  });
}
 getCourses(teacherId: any)
  {
       this.profAndTa.getMyCourses(teacherId).subscribe({
        next:(response)=> this.myCourses=response
        
      });
  }
  SelectCourse(course:any,teacherId:any)
  {if(course === "Course Name") {

      this.getMyStudents(this.loggedInUserInfo[0].logginUserID);
      
      this.getCourses(this.loggedInUserInfo[0].logginUserID);
   
}
  else{
    console.log("select course "+course );
    this.profAndTa.selectCourse(course,teacherId).subscribe({
      next:(response)=> {
        this.myStudents=response   
        console.log('=======',response);
      }

    });
    }
  }
  selectGrade(grade:any)
  { if(grade ==="Course Grade") {
    
      this.getMyStudents(this.loggedInUserInfo[0].logginUserID);
      
  
   
  }else{
    console.log("select course "+grade );
   
  this.profAndTa.selectGrade(grade).subscribe({
      next:(response)=> this.myStudents=response
      
    });
      
  }
  }
    
  }
