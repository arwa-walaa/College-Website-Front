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
  UserData:any;
  officeHours:any;
  flag :any=false;
  TAInfo: any;
  Type:any;
  name:any
  phone:any
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
 token=this._AuthService.getToken();
  constructor(private _AuthService:AuthService,private profTaService: ProfessorAndTaService,
    private http: HttpClient,private cdr: ChangeDetectorRef, private profAndTa:ProfessorAndTaService ){}
  
  ngOnInit(): void {
   
    this.profAndTa.getUserType(this.token).subscribe((type:any ) => {
      this.Type=type[0].Type
      if(type[0].Type==="Professor" ){
       
        this.profAndTa.getProfessorInfo(this.token).subscribe((profInfo:any ) => {
          // this.name=profInfo[0].professorName
          this.UserData=profInfo;
          this.name=this.UserData[0].professorName
          this.phone=this.UserData[0].phoneNumber
          this.profTaService.getProfOfficeHours(profInfo[0].professorId).subscribe((officeHours:any)=>{
             this.officeHours=officeHours;
             console.log('======officehours',officeHours);
          })

        });
      }
      else if(type[0].Type==="TA"){
       
        this.profAndTa.getTAInfo(this.token).subscribe((TaInfo:any ) => {
         this.UserData=TaInfo
         this.name=this.UserData[0].TAName
         this.phone=this.UserData[0].phone
         this.profTaService.returnTAOfficeHours(TaInfo[0].TAId).subscribe((officeHours:any)=>{
          this.officeHours=officeHours;
          console.log('======officehours',officeHours);
       })

        });
      }});
    
  }
  onSubmit() {
    const updatedValues = {
      EName: (<HTMLInputElement>document.getElementById('EName')).value,
      Address: (<HTMLInputElement>document.getElementById('Address')).value,
      Phone: (<HTMLInputElement>document.getElementById('Phone')).value,
      Email: (<HTMLInputElement>document.getElementById('Email')).value,
    };
    this.profAndTa.getUserType(this.token).subscribe((type:any ) => {
     
     
      if(type[0].Type==="Professor" ){
        this.profAndTa.getProfessorInfo(this.token).subscribe((profInfo:any ) => {
        this.http.put('http://127.0.0.1:8000/api/updateProfProfile/' +profInfo[0].professorId , updatedValues)
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
      });
    }else if(type[0].Type==="TA"){
      this.profAndTa.getTAInfo(this.token).subscribe((TaInfo:any ) => {
        this.http.put('http://127.0.0.1:8000/api/updateTAProfile/' +TaInfo[0].TAId , updatedValues)
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


      });

    }
    });
 
   
    
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
