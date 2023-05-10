import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  
Announcemets: any;
  searchText='';
 
  constructor(private router: Router, private studendService: StudentsService) {
   
  }
  ngOnInit(): void {
    this.studendService.getAllAnnouncemets().subscribe({
      next:(response)=> this.Announcemets=response
      
    });
   
    // throw new Error('Method not implemented.');
    
  }
  navigateToTop50()
  {
    this.router.navigate(['Top50']);
  }

 
}
