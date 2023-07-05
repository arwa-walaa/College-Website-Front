import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dr-ta-current-gps',
  templateUrl: './dr-ta-current-gps.component.html',
  styleUrls: ['./dr-ta-current-gps.component.css']
})
export class DrTaCurrentGPsComponent {

  teacherId:any;
  currentGPs:any;
  public showData = true;

  constructor(private router: Router,
  
    private profAndTa:ProfessorAndTaService ,
    private _AuthService:AuthService,
    private http: HttpClient,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const test = params['teacherId'];
        this.teacherId = test;       
        console.log('Teacher Id:', test);
      });
      this.returnTeacherGPs(this.teacherId);
     }

     returnTeacherGPs(teacherId:any)
     {
      this.profAndTa.returnTeacherGPs(teacherId)
      .subscribe(
        response => {
          this.currentGPs=response;
          console.log('Current GPs',this.currentGPs);
      },
      error => {
        console.error('Error!', error);   
      });
     }

     navigateToStudent(studentID: any) {
      this.profAndTa.getStudentData(studentID).subscribe((studentData:any ) => {
        console.log('studentData[0]',studentData[0])
       
        this.router.navigate(['/ViewStudentProfile'], { queryParams: studentData[0]} );
      
      });
     
    }


}
