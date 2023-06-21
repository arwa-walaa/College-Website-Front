import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  navigateToAnnoucements() {
   
    // if (this.activatedRoute.snapshot.routeConfig) {
    //   const currentRoute = this.activatedRoute.snapshot.routeConfig.path;
    //   this.router.navigate([currentRoute, 'Announcements']);
    // }
      this.router.navigate(['Announcements']);
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
  navigateToScheduale_Bylaw(){
    this.router.navigate(['Schedules_Bylaw']);
  }

  
}
