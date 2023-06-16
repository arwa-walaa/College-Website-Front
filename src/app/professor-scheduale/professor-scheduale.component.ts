import { Component } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-professor-scheduale',
  templateUrl: './professor-scheduale.component.html',
  styleUrls: ['./professor-scheduale.component.css']
})
export class ProfessorSchedualeComponent {


  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  times = ['08:00:00', '09:30:00', '11:15:00', '12:45:00', '02:30:00', '04:00:00', '05:30:00'];
    ScheduleInfo: any;
    
   public array:any[]=[]
    constructor(private router: Router,private _AuthService:AuthService,
       private profAndTa:ProfessorAndTaService,private ProfService:ProfessorTAService) {}


    ngOnInit(): void {
      const token = this._AuthService.getToken();

this._AuthService.getType(token).subscribe((userType:any ) => {
  if (userType && userType.length > 0) {
    const userTypeValue = userType[0].Type;
    console.log("usertype", userTypeValue);

    if (userTypeValue === "Professor") {
      this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {  
        if (ProfessorData && ProfessorData.length > 0) {
          this.getSchedualeProf(ProfessorData[0].professorId);
          console.log('prof data',this.getSchedualeProf(ProfessorData[0].professorId));
        } else {
          console.error("ProfessorData is empty or null");
        }
      });
    } else if (userTypeValue === "TA") {
      this.profAndTa.getTAInfo(token).subscribe((TAData:any ) => {   
        if (TAData && TAData.length > 0) {
          this.getSchedualeTa(TAData[0].TAId);
          console.log('Ta data',this.getSchedualeTa(TAData[0].TAId));
        } else {
          console.error("TAData is empty or null");
        }
      });
    } else {
      console.error("Unknown userType: " + userTypeValue);
    }
  } else {
    console.error("userType is empty or null");
  }
});
    }
    

    getSchedualeProf(ProfessorID:any){
      this.ProfService.returnProfScheduale(ProfessorID).subscribe({
        next:(response)=>{
        
          this.ScheduleInfo=response
          this.array= [...this.transformScheduleInfoProf( this.ScheduleInfo)]
          console.log( "0000",this.ScheduleInfo)
          console.log( "1111",this.array)   
        } 
      });     
    }

    getSchedualeTa(TaID:any){
      this.ProfService.returnTAScheduale(TaID).subscribe({
        next:(response)=>{
        
          this.ScheduleInfo=response
          this.array= [...this.transformScheduleInfoTA( this.ScheduleInfo)]
          console.log( "0000",this.ScheduleInfo)
          console.log( "1111",this.array)       
        } 
      });
       
    }

    transformScheduleInfoProf(scheduleInfo: any[]) {
      const result = [];
      for (const info of scheduleInfo) {
        if (info.slotday1) {
          result.push({
            slotName: info.courseName,
            slotday: info.slotday1,
            startTime: info.startTime1,
            endTime: info.endTime1,
            slotPlace: info.slotPlace1
          });
        }
        if (info.slotday2) {
          result.push({
            slotName: info.courseName,
            slotday: info.slotday2,
            startTime: info.startTime2,
            endTime: info.endTime2,
            slotPlace: info.slotPlace2
          });
        }
       
      }
      return result;
    }

    ///////////////////
    transformScheduleInfoTA(scheduleInfo: any[]) {
      const result = [];
      for (const info of scheduleInfo) {
        if (info.slotDay) {
          result.push({
            slotName: info.groupNumber,
            slotday: info.slotDay,
            startTime: info.startTime,
            endTime: info.endTime,
            slotPlace: info.slotPlace,
            CourseName:info.courseName
          });
        }
       
       
      }
      return result;
    }
    
    
  }