import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  isReloaded: any = null;
  constructor(private router: Router) {}
  ngOnInit(): void {
    const loggedIn = localStorage.getItem('loggedIn');
  
    // if the user has just logged in, reload the page to prevent caching issues
    if (loggedIn) {
      localStorage.removeItem('loggedIn'); // remove the flag from local storage
      window.location.reload();
    }
  }

  navigateToAddAnnouncment() {
    this.router.navigate(['AddAnnouncements']);
  }
  navigateToDashboards() {
    this.router.navigate(['dashboard']);
  }
  navigateToOptions() {
    this.router.navigate(['admin_options']);
  }
  navigateToAcceptedGP() {
    this.router.navigate(['gp_requests']);
  }

}
