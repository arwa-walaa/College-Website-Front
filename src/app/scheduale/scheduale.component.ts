// import { Component, ElementRef, ViewChild } from '@angular/core';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'app-scheduale',
  templateUrl: './scheduale.component.html',
  styleUrls: ['./scheduale.component.css']
})
export class SchedualeComponent {
weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
times = ['08:00:00', '09:30:00', '11:15:00', '12:45:00', '02:30:00', '04:00:00', '05:30:00'];
  ScheduleInfo: any;
  
 public array:any[]=[]
  constructor(private studendService: StudentsService,private _AuthService:AuthService) {}
  ngOnInit(): void {
     
    const token=this._AuthService.getToken();
    this.studendService.getStudentInfo(token).subscribe((StudentData:any ) => {
      this.getScheduale(StudentData[0].studentId)

    });
   
  }
  getScheduale(studentId:any){
    this.studendService.returnScheduale(studentId).subscribe({
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
