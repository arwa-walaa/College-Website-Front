import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.css']
})
export class AddGradesComponent implements OnInit{
  Courses:any;
  courseId:any;
  Students:any;
  studentId:any;

  form: FormGroup | any;
  formSubmitted = false;

  constructor(private router: Router, private studendService: StudentsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _AuthService:AuthService,
    private _AdminService:AdminService,
   private profAndTa:ProfessorAndTaService ) {
  }
  navigateToAdmin_options(){
    this.router.navigate(['admin_options']);
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
    this.form = new FormGroup({
      // course: new FormControl(this.courseId, Validators.required),
      // student: new FormControl(this.studentId, Validators.required),
      termGrade: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(40)] ),
      finalGrade: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(60)]),
    })

    this._AdminService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
    });
  }

  SelectCourse(course:any)
  {
    this.courseId=course;
    console.log('course id',this.courseId);
    this.getStudentInCourse(this.courseId);
  }

  SelectStudent(student:any)
  {
    this.studentId=student
  }

  getStudentInCourse(courseId:any)
  {
    this._AdminService.getStudentInCourse(courseId).subscribe(
      response => {
        this.Students=response;
        console.log('courseId',this.courseId)
        console.log('students',this.Students)

    },
    error => {
      console.error('Error!', error);   
    });
  }

  submit(form:FormGroup){
   
    console.log('form',form.value)
if(form.valid){ 
  this.formSubmitted = true;
  this._AdminService.addGrade(this.courseId,this.studentId,form.value).subscribe(
  response=> {

   
      // alert('grades have been inserted succefully');     
   
    // this.router.navigate(['admin_options']);   
}
,
error => { 
  // alert('grades have been inserted succefully'); 
  this.router.navigate(['admin_options']);   
  // console.error(error);  
})}
else{
  alert('the form is invalid'); 
}
  
  }

}
