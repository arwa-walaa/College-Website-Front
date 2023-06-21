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
    this.router.navigate(['']);
  }
  navigateToDashboards() {
    this.router.navigate(['dashboard']);
  }
  navigateToAddGrades() {
    this.router.navigate(['']);
  }
  navigateToAcceptedGP() {
    this.router.navigate(['']);
  }

}
