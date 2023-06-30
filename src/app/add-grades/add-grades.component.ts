import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';

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
    private _AdminService:AdminService) {
  }

  
  ngOnInit(): void {
    this.form = new FormGroup({
      course: new FormControl(this.courseId, Validators.required),
      student: new FormControl(this.studentId, Validators.required),
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
    this.formSubmitted = true;
    console.log('form',form.value),

    this._AdminService.addGrade(this.courseId,this.studentId,form.value).subscribe(
      response=> {
        if (response && !('error' in response)) {
          alert('grades have been inserted succefully');     
        }    
    }
    ,
    error => { 
      alert('grades have been inserted succefully'); 
      console.error(error);  
    });
  }

}
