import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dr-ta-courses',
  templateUrl: './dr-ta-courses.component.html',
  styleUrls: ['./dr-ta-courses.component.css']
})
export class DrTaCoursesComponent {
  myCourses: any;
  constructor(private router: Router,private _AuthService:AuthService,private profAndTa:ProfessorAndTaService) {} 
  navigateToGpRequest() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.getCourses(ProfessorData[0].professorId)
    });

  }

  getCourses(professorId:any)
  {
    this.profAndTa.getMyCourses(professorId).subscribe(
      response => {
        this.myCourses=response;
        console.log('Courssssssssss',this.myCourses);
    
    },
    error => {
      console.error('Error!', error);
      
      
    });
  }

 
  
  navigateToCourse() {
    this.router.navigate(['course_info']);
  }
}
