import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dr-ta-courses',
  templateUrl: './dr-ta-courses.component.html',
  styleUrls: ['./dr-ta-courses.component.css']
})
export class DrTaCoursesComponent {
  constructor(private router: Router) {} 
  navigateToGpRequest() {
    this.router.navigate(['']);
  }
  navigateToCourse() {
    this.router.navigate(['course_info']);
  }
}
