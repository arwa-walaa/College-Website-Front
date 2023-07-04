// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import tinymce from 'tinymce';
// // import tinymce from 'tinymce/tinymce';
// import 'tinymce/themes/silver';
// import 'tinymce/plugins/lists';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/table';
// import 'tinymce/plugins/wordcount';

// @Component({
//   selector: 'app-add-announcements',
//   templateUrl: './add-announcements.component.html',
//   styleUrls: ['./add-announcements.component.css']
// })
// export class AddAnnouncementsComponent {
//   AnnTitle:any
//   flag:any=null
// //   editorConfig = {
// //     base_url: '/tinymce',
// //     suffix: '.min',
// //     plugins: 'lists link image table wordcount',
// //     toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | forecolor'],
// // };
// editorConfig = {
//   base_url: '/tinymce',
//   suffix: '.min',
//   plugins: 'lists link image table wordcount',
//   toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | forecolor'],
//   init: {
//     height: 500,
//     menubar: false,
//     plugins: [
//       'advlist autolink lists link image charmap print preview anchor',
//       'searchreplace visualblocks code fullscreen',
//       'insertdatetime media table paste code help wordcount'
//     ],
//     toolbar:
//       'undo redo | formatselect | bold italic backcolor | \
//       alignleft aligncenter alignright alignjustify | \
//       bullist numlist outdent indent | removeformat | help'
//   }
// };

// constructor(private http: HttpClient) {}

// ngOnInit() {
 
// }
//   saveAnnouncement() {
//     console.log("ann title",this.AnnTitle)
//     if (tinymce.activeEditor) {
//       const editorContent = tinymce.activeEditor.getContent(); 
//       const currentDateTimeString = new Date().toLocaleString();
//       console.log(currentDateTimeString);
//       const announcementData = { content: editorContent,time:currentDateTimeString ,announcmentTitle:this.AnnTitle};
//       console.log('you write == ',announcementData);
      
//   this.http.post('http://127.0.0.1:8000/api/addAnnouncments', announcementData).subscribe(response => {
        
//         console.log('Announcement saved successfully!');
//         this.flag=true
//       },
//        error => {
//         console.error('Error saving announcement:', error);
//         this.flag=false
//       });
//     }
    
    

    
//    }
// }
