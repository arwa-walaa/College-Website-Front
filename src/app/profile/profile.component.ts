import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  StudentData: any;
  flag :any=false;
  constructor(private _AuthService:AuthService,private studendService: StudentsService,private http: HttpClient){}
  ngOnInit(): void {
    
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe({
      next:(response)=> this.StudentData=response
      
    });
 
  }
  onSubmit() {
    const updatedValues = {
      EName: (<HTMLInputElement>document.getElementById('EName')).value,
      Address: (<HTMLInputElement>document.getElementById('Address')).value,
      Phone: (<HTMLInputElement>document.getElementById('Phone')).value,
      Mobile: (<HTMLInputElement>document.getElementById('Mobile')).value,
      Email: (<HTMLInputElement>document.getElementById('Email')).value,
      first_language: (<HTMLInputElement>document.getElementById('First Language')).value,
      second_anguage: (<HTMLInputElement>document.getElementById('Second Language')).value
    };
    this.http.put('http://127.0.0.1:8000/api/updateProfile/' + this.StudentData[0].studentId , updatedValues)
    .subscribe(
      response => {
        console.log(response);
        this.flag=true;
        // Show success message to user
      },
      error => {
        console.error(error);
        // Show error message to user
      }
    )
  }
  
}
