import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  arabic_scheudle:any='General Schedule';
  
  constructor(private router: Router, private studendService: StudentsService,private http: HttpClient) {
   
  }
 
  downloadFile(filename: string): void {
    const apiUrl = "http://127.0.0.1:8000/api/downloadScheudle/"+filename;
    
    this.http.get(apiUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename; // Set the download filename to the requested filename
        link.click();
      });
  }
  
  
  
}
