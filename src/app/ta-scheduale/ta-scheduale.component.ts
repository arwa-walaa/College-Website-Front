import { Component } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';

@Component({
  selector: 'app-ta-scheduale',
  templateUrl: './ta-scheduale.component.html',
  styleUrls: ['./ta-scheduale.component.css']
})
export class TaSchedualeComponent {
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  times = ['08:00:00', '09:30:00', '11:15:00', '12:45:00', '02:30:00', '04:00:00', '05:30:00'];
    ScheduleInfo: any;
    
   public array:any[]=[]
    constructor(private TAService: ProfessorTAService) {}
    ngOnInit(): void {
      this.getScheduale()
      
     
    }
    getScheduale(){
      this.TAService.returnTAScheduale(1).subscribe({
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
