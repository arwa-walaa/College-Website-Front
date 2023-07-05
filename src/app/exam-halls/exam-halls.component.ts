import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-exam-halls',
  templateUrl: './exam-halls.component.html',
  styleUrls: ['./exam-halls.component.css']
})
export class ExamHallsComponent {
  title='Exam Halls';
  ExamHall_Info: any;
  // data=[
  //   {code:"IS437" ,subjectName:"Information System Development Methodology", examHall:"صالة 1" 
  //   ,location:"مبنى المحاضرات امام مدرج ابراهيم فرج"
  //   , studentNumber:"25"},
  //   {code:"IS437" ,subjectName:"Information System Development Methodology", examHall:"صالة 1" 
  //   ,location:"مبنى المحاضرات امام مدرج ابراهيم فرج"
  //   , studentNumber:"23"},
  //   {code:"IS437" ,subjectName:"Information System Development Methodology", examHall:"صالة 1" 
  //   ,location:"مبنى المحاضرات امام مدرج ابراهيم فرج"
  //   , studentNumber:"23"},
  //   {code:"IS437" ,subjectName:"Information System Development Methodology", examHall:"صالة 1" 
  //   ,location:"مبنى المحاضرات امام مدرج ابراهيم فرج"
  //   , studentNumber:"23"},
  //   {code:"IS437" ,subjectName:"Information System Development Methodology", examHall:"صالة 1" 
  //   ,location:"مبنى المحاضرات امام مدرج ابراهيم فرج"
  //   , studentNumber:"23"},
  // ]
  constructor(private router: Router, private studendService: StudentsService,private _AuthService:AuthService) {}
  // getExamHalls(student_id:any)
  // {
    
  //   this.studendService.getExamHalls(student_id).subscribe({
  //     next:(response)=> this.ExamHall_Info=response
      
  //   });
  // }
  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe((StudentData:any ) => {
    
  
      this.assignStudentId(StudentData[0].studentId)
      
      
    });
    
  }
  assignStudentId(studentId:any)
  {
    this.studendService.getExamHalls(studentId).subscribe({

      next:(response)=> this.ExamHall_Info=response
     
      
    });
  }
  searchText='';
  navigateToHome(){
    this.router.navigate(['home_login']); 
  }
}
