import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit{
  registrationStatus= 'closed';
  evaluationFormStatus:any
  programSelectionStatus= 'closed';
  gpFormStatus:any

  constructor(private router: Router, private adminService:AdminService) {}
  // ngOnInit(): void {
  //   this.adminService.getAdminControlStatus().subscribe((Data:any)=>{
  //     this.gpFormStatus= Data[0].GpFormStatus
  //     this.evaluationFormStatus= Data[0].evaluationStatus ===1
  //     console.log("Data",Data)
  //   })
  // }
  ngOnInit(): void {
    this.adminService.getAdminControlStatus().subscribe((data: any) => {
      this.gpFormStatus = data[0].GpFormStatus;
      this.evaluationFormStatus = data[0].evaluationStatus;
      console.log("evaluationFormStatus", this.evaluationFormStatus);
    });
  }

  navigateToAddGrades(){
    this.router.navigate(['add_grades']);
  }
  navigateToAddCourse(){
    this.router.navigate(['add_course']);
  }

  calculateGPA(){

  }

  calculatePreferences(){

  this.adminService.setDepatmentToStudent()
  }

  setRegistrationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.registrationStatus = target.checked ? 'open' : 'closed';
    }
    this.adminService.setRegisterationStatus(this.registrationStatus);
    console.log('Registration status:', this.registrationStatus);

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

  setSelectionStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.programSelectionStatus = target.checked ? 'open' : 'closed';
    }
    console.log('Program Selection status:', this.programSelectionStatus);
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
