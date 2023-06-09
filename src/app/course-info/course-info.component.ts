import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent {
  constructor(private router: Router) {}
  navigateToViewStudents() {
    this.router.navigate(['']);
  }
  navigateToAddGrades() {
    this.router.navigate(['']);
  }
  navigateToSeeFeedbacks() {
    this.router.navigate(['']);
  }
  navigateToViewStatistics() {
    this.router.navigate(['']);
  }
}
