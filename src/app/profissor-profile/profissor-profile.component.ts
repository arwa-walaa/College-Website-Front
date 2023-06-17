import { Component } from '@angular/core';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { interval, timer } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profissor-profile',
  templateUrl: './profissor-profile.component.html',
  styleUrls: ['./profissor-profile.component.css']
})
export class ProfissorProfileComponent {
  ProfData:any;
  officeHours:any;
  flag :any=false;
  constructor(private _AuthService:AuthService,private profTaService: ProfessorAndTaService,
    private http: HttpClient,private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.profTaService.getProfessorInfo(token).subscribe((ProfData:any)=>
    {
       this.ProfData=ProfData;
       this.profTaService.getProfOfficeHours(ProfData[0].professorId).subscribe((officeHours:any)=>{
          this.officeHours=officeHours;
          console.log('======officehours',officeHours);
       })
    })  
  }
  onSubmit() {
    const updatedValues = {
      EName: (<HTMLInputElement>document.getElementById('EName')).value,
      Address: (<HTMLInputElement>document.getElementById('Address')).value,
      Phone: (<HTMLInputElement>document.getElementById('Phone')).value,
      Email: (<HTMLInputElement>document.getElementById('Email')).value,
    };
    this.http.put('http://127.0.0.1:8000/api/updateProfProfile/' + this.ProfData[0].professorId , updatedValues)
    .subscribe(
      response => {
        console.log(response);
        this.flag=true;
        // Show success message to user
      },
      error => {
        console.error(error);
        // Show error message to user
      }
    )
    
  }
  
  deleteOfficeHour(officeHourId:any)
  {
    this.profTaService.deleteOfficeHour(officeHourId).subscribe(()=>{
      window.location.reload();
    });
    //console.log('test');
  
  }
  updateOfficeHour(day: string, startTime: string, endTime: string, location: string, officeHourID: any) {
    const updatedOfficeHour = { Day: day, StartTime: startTime, EndTime: endTime, Location: location };
    this.profTaService.updateOfficeHour(officeHourID, updatedOfficeHour).subscribe(() => {
      window.location.reload();
    });
  }
  
}
