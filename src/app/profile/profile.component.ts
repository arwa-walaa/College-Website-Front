import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  StudentData: any;
  flag :any=false;
  constructor(private _AuthService:AuthService,
    private studendService: StudentsService,private http: HttpClient
   ,private router: Router,
   private profAndTa: ProfessorAndTaService
   ){}

  ngOnInit(): void {
    
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe({
      next:(response)=> this.StudentData=response
      
    });
 
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
