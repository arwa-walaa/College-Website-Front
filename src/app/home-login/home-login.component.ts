
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent  implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
    const loggedIn = localStorage.getItem('loggedIn');
  
    // if the user has just logged in, reload the page to prevent caching issues
    if (loggedIn) {
      localStorage.removeItem('loggedIn'); // remove the flag from local storage
      window.location.reload();
    }
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
  navigateToOfficeHours() {
    this.router.navigate(['officeHours']);
  }
  navigateToExamHalls(){
    this.router.navigate(['examHalls']);
  }
  navigateToRegisterdCoursesAndResults() {
    this.router.navigate(['registerdCoursesAndResults']);
  }
  navigateToScheduale(){
    this.router.navigate(['scheduale']);
  }

  
}
