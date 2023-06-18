import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gp-requests',
  templateUrl: './gp-requests.component.html',
  styleUrls: ['./gp-requests.component.css']
})
export class GpRequestsComponent {
  constructor(private router: Router) {}
  public showData = true 
  public response = false
  public message = ""

  public students = [{studentID:"20190145"},
  {studentID:"20190259"},
  {studentID:"20190120"},
  {studentID:"20190014"},
  {studentID:"20190421"},
  ];

  public data = [
    {prof:"Dr. Folan", 
    ta:"Eng.Folany",
    idea:"Some Text. Some Text.Some Text.Some Text.Some Text.Some Text.Some Text.Some Text.",
    requirements:"Some Text. \n Some Text. \n Some Text."},
]

  navigateToStudent(studentID: string) {
    // Navigate to the student profile page
    this.students = this.students.filter(student => student.studentID !== studentID);
    this.router.navigate(['/profile'], { queryParams: {studentID: studentID} });
  }

  acceptGp(){
    this.showData = false;
    this.response = true;
    this.message = "This Graduation Project was Accepted!";
  }

  rejectGp(){
    this.showData = false;
    this.response = true;
    this.message = "This Graduation Project was Rejected!";
  }
}
