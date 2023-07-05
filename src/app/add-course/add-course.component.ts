import { Component } from '@angular/core';
import { OfficeHoursServiceService } from '../office-hours-service.service';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  form: FormGroup | any;

  departments: any;
  professors: any;
  professor2:any=""
  professor1:any=""
  flag: any=null;
 

  constructor(private router: Router, private http: HttpClient, private _OfficeHoursServiceService:OfficeHoursServiceService,private __StudentsService:StudentsService) {}

weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  
  prof1ID:any;
  prof2ID:any;
  ngOnInit(): void {
    this._OfficeHoursServiceService.returnAllDepartments().subscribe({
      next:(response)=>this.departments =response
     });

     this.__StudentsService.returnAllProfessor().subscribe((professors:any ) => {
      this.professors=professors
     
     });

     this.form = new FormGroup({
      course_name: new FormControl('', Validators.required),
      course_code: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{2}\d{3}$")]),
      course_ID: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{2}\d{3}$")]),
      department_code: new FormControl(null, Validators.required),
      semester: new FormControl(null, Validators.required),
      year: new FormControl(2000, [Validators.required, Validators.pattern("/^[2-3]\d{3}$/")]),
      level: new FormControl(null, Validators.required),
      professor1: new FormControl(null, Validators.required),
      professor2: new FormControl(null),
      credit_hours: new FormControl(0, [Validators.required,Validators.min(0),Validators.max(5)] ),
      num_of_groups: new FormControl(0, [Validators.required,Validators.min(0),Validators.max(100)] ),
      type: new FormControl('mandatory', Validators.required),
      slot_day1: new FormControl(null, Validators.required),
      start_time1: new FormControl(null, Validators.required),
      end_time1: new FormControl(null, Validators.required),
      slot_place1: new FormControl(null, Validators.required),
      slot_day2: new FormControl(null, Validators.required),
      start_time2: new FormControl(null, Validators.required),
      end_time2: new FormControl(null, Validators.required),
      slot_place2: new FormControl(null, Validators.required),

    })

  }

  supmit(form:FormGroup){

    console.log('Course Info:',form.value),
    // let url = 'http://127.0.0.1:8000/api/AddCourse/';
    // let options = { headers: { 'Content-Type': 'application/json' } };
    // replace with the actual ID
    this.http.post('http://127.0.0.1:8000/api/AddCourse', form.value).subscribe(
    // this.http.post(url +this.Course_Info, options).subscribe(
        (response) => {
            console.log("===============", response)
            this.flag=true;
            this.router.navigate(['admin_options']);
        }, (error) => {
            console.error("erooooor", error);
            this.flag=false;
        });
   
  }


}
