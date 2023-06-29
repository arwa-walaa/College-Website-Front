import { Component } from '@angular/core';
import { OfficeHoursServiceService } from '../office-hours-service.service';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  departments: any;
  professors: any;
  departmentCode:any;
  professor2:any=""
  professor1:any=""
  slotday1:any
  slotday2:any
  type:any
  Semester:any
  Level:any
  flag: any=null;
 

  constructor( private http: HttpClient, private _OfficeHoursServiceService:OfficeHoursServiceService,private __StudentsService:StudentsService) {}

weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
Course_Info: any = { courseName: '', departmentCode: '',Course_Code:'',Level:'',Semester:'',
                      type:'',slotday1:'',startTime1:'',endTime1:'',creditHours:'',slotday2:'',startTime2:'',
                      endTime2:'',slotPlace1:'',slotPlace2:'',professor1:'',professor2:'',Num_of_groups:'' ,courseID:""};
  
  prof1ID:any;
  prof2ID:any;
  ngOnInit(): void {
    this._OfficeHoursServiceService.returnAllDepartments().subscribe({
      next:(response)=>this.departments =response
     });

     this.__StudentsService.returnAllProfessor().subscribe((professors:any ) => {
      this.professors=professors
     
     });
  }

  supmit(){
    this.Course_Info.Level=this.Level
    this.Course_Info.Semester=this.Semester
    this.Course_Info.type=this.type
    this.Course_Info.slotday2=this.slotday2
    this.Course_Info.slotday1=this.slotday1
    this.Course_Info.professor1=this.professor1
    this.Course_Info.professor2=this.professor2
    this.Course_Info.departmentCode=this.departmentCode
    console.log("Course_Info",this.Course_Info)
    // let url = 'http://127.0.0.1:8000/api/AddCourse/';
    // let options = { headers: { 'Content-Type': 'application/json' } };
    // replace with the actual ID
    this.http.post('http://127.0.0.1:8000/api/AddCourse', this.Course_Info).subscribe(
    // this.http.post(url +this.Course_Info, options).subscribe(
        (response) => {
            console.log("===============", response)
            this.flag=true;
        }, (error) => {
            console.error("erooooor", error);
            this.flag=false;
        });
   
  }


}
