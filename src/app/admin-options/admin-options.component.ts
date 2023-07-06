import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit{
  registrationStatus:any;
  evaluationFormStatus:any
  programSelectionStatus:any;
  gpFormStatus:any
  registerationStatus: any;

  constructor(private adminService:AdminService,private router: Router,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {}
  
  ngOnInit(): void {
    this.adminService.getAdminControlStatus().subscribe((data: any) => {
      this.gpFormStatus = data[0].GpFormStatus;
      this.evaluationFormStatus = data[0].evaluationStatus;
      this.registerationStatus = data[0].registerationStatus;
      this.programSelectionStatus = data[0].programSelectionStatus;
      console.log("evaluationFormStatus", this.evaluationFormStatus);
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
  navigateToAddGrades(){
    this.router.navigate(['add_grades']);
  }
  navigateToAddCourse(){
    this.router.navigate(['add_course']);
  }
  navigateToAddGroups(){
    this.router.navigate(['add_groups']);
  }

  calculateGPA(){

  }

  calculatePreferences(){

  this.adminService.setDepatmentToStudent().subscribe(()=>{
    alert("Students have been distributed over Departments ")
  })
  
  }

  setRegistrationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.registerationStatus = target.checked ? 1 : 0;
      this.adminService.updateRegisterationStatus(this.registerationStatus).subscribe(response => {
        console.log(response);
      
        // Show success message to user
      },
      error => {console.log(error);});
    }
   
    console.log('Registration status:', this.registerationStatus);

  }


  setEvaluationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      if(target.checked){
        this.adminService.setEvaluationStatus(1).subscribe( response => {
          console.log(response);
        
          // Show success message to user
        },
        error => {console.log(error);})
       
      }
      else{
        this.adminService.setEvaluationStatus(0).subscribe( response => {
          console.log(response);
        
        },
        error => {console.log(error);})
       
       
      }
    
    }

   
  }
  setSelectionStatus(event: Event) 
  {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.programSelectionStatus = target.checked ? 1 : 0;
      this.adminService.updateprogramSelectionStatus(this.programSelectionStatus).subscribe(response => {
        console.log(response);
      
        // Show success message to user
      },
      error => {console.log(error);});
    }
   
    console.log('programSelection status:', this.programSelectionStatus);

  }

  setGPFormStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      if(target.checked){
        this.adminService.setGPFormStatus(1).subscribe( response => {
          console.log(response);
        
          // Show success message to user
        },
        error => {console.log(error);})
       
      }
      else{
        this.adminService.setGPFormStatus(0).subscribe( response => {
          console.log(response);
        
        },
        error => {console.log(error);})
       
       
      }
    }
   
  }
 

}
