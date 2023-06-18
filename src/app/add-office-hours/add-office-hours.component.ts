import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-office-hours',
  templateUrl: './add-office-hours.component.html',
  styleUrls: ['./add-office-hours.component.css']
})
export class AddOfficeHoursComponent {

  constructor(private http: HttpClient,private router: Router,private _AuthService:AuthService,
    private profAndTa:ProfessorAndTaService,private ProfService:ProfessorTAService) {
  }

  officeHours: any[] = [{ startTime: '', endTime: '',location:'',Day:'',type:'Professor',name: '' , email: '' , department: '' }];
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  addOfficeHour(name:any, email:any, department:any) {
    this.officeHours.push({ startTime: '', endTime: '',location:'',Day:'',type:'Professor',name: name , email: email , department: department});
  }
   updateDay(index: number, day: string) {
    this.officeHours[index].Day = day;
  }
  OnInit()
  {
    console.log("====",this.officeHours);
    const token=this._AuthService.getToken();
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
     
    });
  }
  submit() {
    

    // Loop through the form inputs and update the corresponding office hours
    console.log("===============start test=========");
    let url = 'http://127.0.0.1:8000/api/insertOfficeHour';
    let options = { headers: { 'Content-Type': 'application/json' } };
    let professorOrTAId = 'ihelal'; // replace with the actual ID
    
    this.http.post(url + '/' + professorOrTAId, this.officeHours, options).subscribe(
        (response) => {
           console.log("===============", response);
        }, (error) => {
           console.error("erooooor", error);
        });
    
    console.log(this.officeHours);
    for (let i = 0; i < this.officeHours.length; i++) {
      const startTimeInput = document.getElementsByName(`startTime${i}`)[0] as HTMLInputElement;
      const endTimeInput = document.getElementsByName(`endTime${i}`)[0] as HTMLInputElement;
      const locationInput = document.getElementsByName(`location${i}`)[0] as HTMLInputElement;
      const dayInput = document.getElementsByName(`Day${i}`)[0] as HTMLSelectElement;

      this.officeHours[i].startTime = startTimeInput.value;
      this.officeHours[i].endTime = endTimeInput.value;
      this.officeHours[i].location = locationInput.value;
      this.officeHours[i].Day = dayInput.value;
    }
    
  }

  submitOfficeHours() {
    const token = this._AuthService.getToken();

    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.addOfficeHour(ProfessorData[0].professorName,ProfessorData[0].email,ProfessorData[0].departmentCode);

    });

  }
 
  
}
