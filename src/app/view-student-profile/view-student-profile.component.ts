import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css']
})
export class ViewStudentProfileComponent {
  StudentData:any
  constructor(private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.StudentData=params
      console.log("this.StudentData",this.StudentData)
     }); 
  }
  navigateToStudentGrades(){
    this.router.navigate(['registerdCoursesAndResults'],{ queryParams: this.StudentData  });

  }

}
