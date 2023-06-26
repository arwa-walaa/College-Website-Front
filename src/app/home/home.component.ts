import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: `
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let crumb of breadcrumbService.crumbs$ | async; let last = last" [ngClass]="{ 'active': last }">
        <a *ngIf="!last" [routerLink]="crumb.path">{{ crumb.label }}</a>
        <span *ngIf="last">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
  <router-outlet></router-outlet>
`

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
      this.router.navigate(['Announcements',]);
  }
  navigateToLogin() {
    this.router.navigate(['login' ]);
  }
  navigateToScheduale_Bylaw(){
    this.router.navigate(['Schedules_Bylaw']);
  }

  
}
