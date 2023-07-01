import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  courseId:any;
  TAs:any;

  ngOnInit(): void {
    this.form = new FormGroup({
      group_name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}\d{2}$")]),
      ta_name: new FormControl(null, Validators.required),
      slot_day: new FormControl(null, Validators.required),
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      slot_place: new FormControl(null, Validators.required),
    })
  }

  SelectCourse(course:any)
  {
    this.courseId=course;
    console.log('course id',this.courseId);
  }

  submit(form:FormGroup){
    console.log('form:',form.value)
  }
}
