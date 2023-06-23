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
  selectedAnnouncement: any;
  isOpened:any;
 
  constructor(private router: Router, private studendService: StudentsService,private sanitizer: DomSanitizer, private datePipe: DatePipe) {
   
  }
  ngOnInit(): void {
    this.studendService.getAllAnnouncemets().subscribe({
      next:(response)=>{ this.Announcemets=response
        console.log(this.Announcemets)
        this.Announcemets = this.Announcemets.map((item: { content: string, created_at: string }) => {
          return {
            ...item,
            content: this.sanitizer.bypassSecurityTrustHtml(item.content),
            created_at: this.formatDate(item.created_at)
          };
        });
        console.log("====",this.Announcemets)
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
  selectAnnouncement(announcement: any) {
    this.selectedAnnouncement = announcement;
    console.log('isOpenedId= ',this.selectedAnnouncement.id);
    
    // this.studendService.updateAnnouncmentStatus(this.selectedAnnouncement.id);
    // this.isOpened=true;
    this.studendService.updateAnnouncmentStatus(this.selectedAnnouncement.id).subscribe(
      response => {
       
        console.log('Announcement status updated successfully');
      },
      error => {
        console.error('Error updating announcement status:', error);
        // handle error here
      }
    );
    
  }
  isAnnouncementOpened(announcement: any): boolean {
    return announcement.isOpened === '1';
  }
 
 
}
