import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-evaluation',
  templateUrl: './course-evaluation.component.html',
  styleUrls: ['./course-evaluation.component.css']
})
export class CourseEvaluationComponent implements OnInit  {
  constructor(private router: Router) {}

  // public courses: string[] = ['Data Base 1', 'Machine Learning', 'Mobile'];
  public courses = [{courseID:"9" ,courseName:"Data Base 1"},
   {courseID:"3" ,courseName:"Mobile"},
   {courseID:"2" ,courseName:"Machine Learning"},
  ];
  public selected:any = [];

  ngOnInit(): void {
  }
  
  // navigateToEvaluateCourse(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   const courseId = target.getAttribute('data-course-id');
  //   const courseName = target.getAttribute('data-course-name');
  //   this.router.navigate(['/CourseFormEvaluation'], { queryParams: {courseId,courseName} });
  // }

  
  // navigateToEvaluateCourse(courseName: string, courseID: string) {
    
  //   this.router.navigate(['/CourseFormEvaluation'], { queryParams: { courseName: courseName, courseID: courseID } });
  //   this.courses.splice(this.courses.findIndex(c => c.courseID === courseID), 1);
  // }

  // navigateToEvaluateCourse(courseName: string, courseID: string) {
  //   // Remove selected course from array
  //   this.courses.splice(this.courses.findIndex(c => c.courseID === courseID), 1);
    
  //   this.router.navigate(['/CourseFormEvaluation'], { queryParams: { courseName: courseName, courseID: courseID } });
  //   }


  navigateToEvaluateCourse(courseName: string, courseID: string) {
   
  
    // Navigate to the course evaluation page

    this.courses = this.courses.filter(course => course.courseID !== courseID);
    this.selected = this.courses;
    // alert(this.selected[0].courseName);
    this.router.navigate(['/CourseFormEvaluation'], { queryParams: { courseName: courseName, courseID: courseID} });
  
  }
  // get selected() {
  //   return this.courses;
  // }
// // Add active class to the current button (highlight it)
//  header = document.getElementById("myDIV");
//  btns = this.header.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   this.className += " active";
//   });
// }


}



