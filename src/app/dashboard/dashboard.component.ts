import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  ngOnInit(): void {
  }
  
  showDept = false;
  showCors = false;

  showDepartment(){
    this.showDept = true;
    this.showCors = false;
  }
  showCourses(){
    this.showDept = false;
    this.showCors = true;
  }



}
