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
  evaluationFormStatus= '0';
  programSelectionStatus= 'closed';
  gpFormStatus= '0';

  constructor(private router: Router, private adminService:AdminService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
      this.registrationStatus = target.checked ? 'opened' : 'closed';
      this.adminService.updateRegisterationStatus(this.registrationStatus);
    }
   
    console.log('Registration status:', this.registrationStatus);

  }


  setEvaluationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.adminService.EvaluationFormStatus = target.checked ? 1 : 0;
    }
    console.log('Evaluation Form status:', this.adminService.EvaluationFormStatus);
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
      this.adminService.GPFormStatus = target.checked ? '1' : '0';
    }
    console.log('GP Form status:', this.adminService.GPFormStatus);
  }

}
