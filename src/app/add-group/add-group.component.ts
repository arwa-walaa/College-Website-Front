import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  form: FormGroup | any; 
  groups: FormGroup[] = [];
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  num_of_groups = 6;
  num_of_remaning_groups = 5;
  Courses:any;
  courseId:any=null;
  TAs:any;
  CourseInfo: any;
 groupArray: any=[];
  flag: any=null;
//  groupForms: FormGroup[] = [];

constructor(private studendService: StudentsService,private http: HttpClient){}
  ngOnInit(): void {
    this.studendService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
      
    });
    this.studendService.returnAllTAs().subscribe((TAs:any ) => {
      this.TAs=TAs
     
     });
     
    
    this.form = new FormGroup({
      group_name: new FormControl(),
      ta_name: new FormControl(null, Validators.required),
      slot_day: new FormControl(null, Validators.required),
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      slot_place: new FormControl(null, Validators.required),
      CourseId: new FormControl(this.courseId),
     
    })
  }

  SelectCourse(course:any)
  {
    this.courseId=course;
    console.log('course id',this.courseId);
    this.studendService.getCourseInfo(this.courseId).subscribe({
      next:(response)=>{this.CourseInfo=response
        console.log("courseInfo",this.CourseInfo)
        const numGroups = this.CourseInfo[0].Num_of_groups;
        for (let i = 0; i < numGroups; i++) {
          this.groupArray.push(i);
        }
      } 
    })
    console.log(this.groupArray)
   
   
  }
 
  // getGroupRange(groupNumber:any): number[] {
  //   return Array(groupNumber).fill(0).map((_, index) => index);
  // }

  // submit(form:FormGroup){
  //   console.log('form:',form.value)
  // }
  submit(form: FormGroup) {
    
    console.log('====', this.courseId)
    form.controls['CourseId'].setValue(this.courseId);
    console.log('form:', form.value);
    let url = 'http://127.0.0.1:8000/api/AddGroup/';
    let options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post(url ,form.value).subscribe(
      (response) => {
        console.log("===============", response)
        this.flag=true;
    }, (error) => {
        console.error("erooooor", error);
        this.flag=false;
    });
    // Save the form values to the database or perform other operations
  }
 
}
