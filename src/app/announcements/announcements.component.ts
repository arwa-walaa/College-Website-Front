import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  
Announcemets: any;
  searchText='';
 
  constructor(private router: Router, private studendService: StudentsService,private sanitizer: DomSanitizer, private datePipe: DatePipe) {
   
  }
  ngOnInit(): void {
    this.studendService.getAllAnnouncemets().subscribe({
      next:(response)=>{ this.Announcemets=response
        console.log(this.Announcemets)
        this.Announcemets = this.Announcemets.map((item: { content: string, created_at: string }) => {
          return {
            ...item, // copy all the properties of item
            content: this.sanitizer.bypassSecurityTrustHtml(item.content), // transform the content field
            created_at_formatted: this.formatDate(item.created_at)
          };
        }
        );
        console.log(this.Announcemets)
    }
    }); 
  }
  formatDate(dateString: string): any {
    const offsetMs = new Date().getTimezoneOffset() * 60 * 1000;
    const date = new Date(Date.parse(dateString) + offsetMs);
    return this.datePipe.transform(date, 'short');
  }
  navigateToTop50()
  {
    this.router.navigate(['Top50']);
  }

 
}
