import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit{
  registrationStatus= 'closed';
  evaluationFormStatus= 'closed';
  programSelectionStatus= 'closed';
  gpFormStatus= 'closed';

  constructor(private router: Router) {}
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

  }

  setRegistrationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.registrationStatus = target.checked ? 'open' : 'closed';
    }
    console.log('Registration status:', this.registrationStatus);
  }

  setEvaluationStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.evaluationFormStatus = target.checked ? 'open' : 'closed';
    }
    console.log('Evaluation Form status:', this.evaluationFormStatus);
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
      this.gpFormStatus = target.checked ? 'open' : 'closed';
    }
    console.log('GP Form status:', this.gpFormStatus);
  }

}
