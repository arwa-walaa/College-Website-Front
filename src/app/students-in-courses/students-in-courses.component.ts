import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-students-in-courses',
  templateUrl: './students-in-courses.component.html',
  styleUrls: ['./students-in-courses.component.css']
})
export class StudentsInCoursesComponent {
  // constructor(private _OfficeHoursServiceService:OfficeHoursServiceService) {}

  p: number = 1;
  count: number = 5;
  myStudents: any;
  myCourses: any;
  grades:any;

  constructor(private router: Router,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {} 

  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.getMyStudents(ProfessorData[0].professorId);
      
      this.getCourses(ProfessorData[0].professorId);
      this.getGrades(ProfessorData[0].professorId);
    });

  }

  searchText='';

  getMyStudents(professorId:any)
  {
    this.profAndTa.getMyStudents(professorId).subscribe(
      response => {
        this.myStudents=response;
    },
    error => {
      console.error('Error!', error);   
    });
  }
getGrades(professorId: any){
  this.profAndTa.getGrades(professorId).subscribe({
    next:(response)=> this.grades=response
    
  });
}
 getCourses(professorId: any)
  {
       this.profAndTa.getMyCourses(professorId).subscribe({
        next:(response)=> this.myCourses=response
        
      });
  }
  SelectCourse(course:any)
  {if(course === "Course Name") {
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.getMyStudents(ProfessorData[0].professorId);
      
      this.getCourses(ProfessorData[0].professorId);
    });
  }
  else{
    console.log("select course "+course );
    this.profAndTa.selectCourse(course).subscribe({
      next:(response)=> this.myStudents=response
      
    });
    }
  }
  selectGrade(grade:any)
  { if(grade ==="Course Grade") {
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.getMyStudents(ProfessorData[0].professorId);
      
  
    });
  }else{
    console.log("select course "+grade );
   
  this.profAndTa.selectGrade(grade).subscribe({
      next:(response)=> this.myStudents=response
      
    });
      
  }
  }
    
  }
