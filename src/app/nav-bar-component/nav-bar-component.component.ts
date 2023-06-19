import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar-component.component.html',
  styleUrls: ['./nav-bar-component.component.css']
})
export class NavBarComponentComponent {
 
  searchQuery: any;
  searchResults!: any[];

  constructor(private http: HttpClient,private router: Router) {}

  searchUsers() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/searchByStudent?q=' + this.searchQuery)
      .subscribe((results) => {
        console.log("this.searchQuery",this.searchQuery)
        this.searchResults = results;
        console.log("Result",results)
      }, (error) => {
        console.error(error);
      });
  }

  goToUserProfile(studentInfo: any) {
    console.log('studentInfo',studentInfo)
    this.router.navigate(['ViewStudentProfile'],{ queryParams: studentInfo  });
  }
}
