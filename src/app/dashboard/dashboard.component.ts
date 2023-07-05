import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router:Router) {
    
  }
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
  navigateToHome(){
    this.router.navigate(['home_admin']); 
  }



}
