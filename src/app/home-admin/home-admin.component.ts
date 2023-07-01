import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
