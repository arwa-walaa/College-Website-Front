import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-add-announcements',
  templateUrl: './add-announcements.component.html',
  styleUrls: ['./add-announcements.component.css']
})
export class AddAnnouncementsComponent {
  AnnTitle:any
  flag:any=null
  announcementBody:any
//   editorConfig = {
//     base_url: '/tinymce',
//     suffix: '.min',
//     plugins: 'lists link image table wordcount',
//     toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | forecolor'],
// };


editorConfig = {
  base_url: '/tinymce',
  suffix: '.min',
  plugins: 'lists link image table wordcount',
  toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | forecolor'],
  init: {
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  }
};

constructor(private http: HttpClient,private router: Router,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {}
navigateToAnnouncement(){
  this.router.navigate(['/Announcements']);
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
ngOnInit() {
 
}
  saveAnnouncement() {
//     console.log("ann title",this.AnnTitle)
//     // if (tinymce.activeEditor) {
//     //   const editorContent = tinymce.activeEditor.getContent(); 
      const currentDateTimeString = new Date().toLocaleString();
      console.log(currentDateTimeString);
      const announcementData = { content: this.announcementBody,time:currentDateTimeString ,announcmentTitle:this.AnnTitle};
      console.log('you write == ',announcementData);
      
  this.http.post('http://127.0.0.1:8000/api/addAnnouncments', announcementData).subscribe(response => {
        
        console.log('Announcement saved successfully!');
        this.flag=true
       this.router.navigate(['home_admin']);
      },
       error => {
        console.error('Error saving announcement:', error);
        this.flag=false
      });
    // }
    
    

    
   }
}
