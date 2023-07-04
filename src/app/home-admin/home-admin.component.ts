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
  ngOnInit() {
    // this.isReloaded=true;
    // if (this.isReloaded===true)
    // {
    //   this.isReloaded=false;
    //   window.location.reload();
    // }
    setInterval(() => {
      window.location.reload();
    }, 216000);
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
