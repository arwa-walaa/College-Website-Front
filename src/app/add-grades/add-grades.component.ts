import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.css']
})
export class AddGradesComponent implements OnInit{
  Courses:any;
  couseId:any;
  Students:any;
  studentId:any;
  form: FormGroup | any;
  formSubmitted = false;

  constructor(private router: Router, private studendService: StudentsService,
    private route: ActivatedRoute,private http: HttpClient,private _AuthService:AuthService) {
  }

  
  ngOnInit(): void {
    this.form = new FormGroup({
      course: new FormControl(this.couseId, Validators.required),
      student: new FormControl(this.studentId, Validators.required),
      termGrade: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(40)] ),
      finalGrade: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(60)]),
    })

    this.studendService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
    });
  }

  SelectCourse(course:any)
  {
    this.couseId=course
  }

  SelectStudent(student:any)
  {
    this.studentId=student
  }

  submit(){
    this.formSubmitted = true;
    console.log(this.form);
  }

}
