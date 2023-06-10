import { Component } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';

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
    constructor(private ProfService: ProfessorTAService) {}
    ngOnInit(): void {
      this.getScheduale()
      
     
    }
    getScheduale(){
      this.ProfService.returnProfScheduale(1).subscribe({
        next:(response)=>{
        
          this.ScheduleInfo=response
          this.array= [...this.transformScheduleInfo( this.ScheduleInfo)]
          console.log( "0000",this.ScheduleInfo)
          console.log( "1111",this.array)
        
        }
   
      });
     
      
    }
    transformScheduleInfo(scheduleInfo: any[]) {
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
    
    
  }