import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

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

  constructor(private router: Router, private adminService:AdminService) {}
  
  ngOnInit(): void {
    this.adminService.getAdminControlStatus().subscribe((data: any) => {
      this.gpFormStatus = data[0].GpFormStatus;
      this.evaluationFormStatus = data[0].evaluationStatus;
      this.registerationStatus = data[0].registerationStatus;
      this.programSelectionStatus = data[0].programSelectionStatus;
      console.log("evaluationFormStatus", this.evaluationFormStatus);
    });
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

  this.adminService.setDepatmentToStudent()
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
