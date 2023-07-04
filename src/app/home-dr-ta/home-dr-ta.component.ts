import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dr-ta',
  templateUrl: './home-dr-ta.component.html',
  styleUrls: ['./home-dr-ta.component.css']
})
export class HomeDrTaComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
   
  }
  navigateToAnnoucements() {
    this.router.navigate(['Announcements']);
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
  navigateToScheduale_Bylaw(){
    this.router.navigate(['Schedules_Bylaw']);
  }
  navigateToChat() {
    this.router.navigate(['FCAIChat']);
  }
  navigateToAddOfficeHours() {
    this.router.navigate(['addOfficeHours']);
  }
  navigateToViewStudents(){
    this.router.navigate(['StudentsInCourses']);
  }
  navigateToMyCourses() {
    this.router.navigate(['drTaCourses']);
  }
  navigateToScheduale(){
    this.router.navigate(['Schedule']);
  }

  
}
