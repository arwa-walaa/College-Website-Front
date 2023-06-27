import { Component } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  Professors:any;
  prof1ID:any;
  prof2ID:any;


  SelectProf1(prof:any){
    this.prof1ID=prof
  }

  SelectProf2(prof:any){
    this.prof2ID=prof
  }


}
