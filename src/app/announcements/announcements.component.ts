import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

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
 
  constructor(private router: Router, private studendService: StudentsService
    ,private sanitizer: DomSanitizer, private datePipe: DatePipe,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {
   
  }
  ngOnInit(): void {
    this.getAllAnnouncemets();
  
  }
  navigateToHome(){
    const token = this._AuthService.getToken();

          if (token) { // check if the token is valid
            this.profAndTa.getUserType(token).subscribe((type: any) => {
              if (type[0].Type === "Professor" || type[0].Type === "TA") {
                
                this.router.navigate(['/drTaHome']);
              }
              else if (type[0].Type === "Student") {
                this.router.navigate(['/home_login']);
              }
              else if (type[0].Type === "Admin") {
                this.router.navigate(['/home_admin']);
              }
            });
            // localStorage.setItem('loggedIn', 'true'); // set the flag in local storage
          }
    // this.router.navigate(['home_login']); 
  }
  getAllAnnouncemets(){
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
    const date = new Date(Date.parse(dateString) - offsetMs);
    return this.datePipe.transform(date, 'dd/MM/yyyy h:mm a');
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
