import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent {
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  times = ['08:00:00', '09:30:00', '11:15:00', '12:45:00', '02:30:00', '04:00:00', '05:30:00'];
    ScheduleInfo: any;
    
   public array:any[]=[]
  myCourses: any;
    constructor(private studendService: StudentsService,private _AuthService:AuthService ,  private profAndTa:ProfessorAndTaService) {}
    ngOnInit(): void {
       
      const token=this._AuthService.getToken();
      this._AuthService.getType(token).subscribe((userType:any ) => {
        if (userType && userType.length > 0) {
          const userTypeValue = userType[0].Type;
          console.log("usertype", userTypeValue);
      
          if (userTypeValue === "Professor") {
            this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {  
              if (ProfessorData && ProfessorData.length > 0) {
                this.getCourses(ProfessorData[0].professorId)
                console.log('prof data',this.getCourses(ProfessorData[0].professorId));
              } else {
                console.error("ProfessorData is empty or null");
              }
            });
          } else if (userTypeValue === "TA") {
            this.profAndTa.getTAInfo(token).subscribe((TAData:any ) => {   
              if (TAData && TAData.length > 0) {
                this.getTACourses(TAData[0].TAId);
                console.log('Ta course',this.getTACourses(TAData[0].TAId));
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
    update(courseID:any){
      this.getScheduale(courseID)
    }
    getScheduale(courseID:any){
      this.profAndTa.getCourseScheduale(courseID,"Second").subscribe({
        next:(response)=>{
        
          this.ScheduleInfo=response
          this.array= [...this.transformScheduleInfo( this.ScheduleInfo)]
          console.log( "0000",this.ScheduleInfo)
          console.log( "1111",this.array)
          this.array = this.array.filter((obj, index, arr) => {
            return index === arr.findIndex((t) => (
              t.slotName === obj.slotName &&
              t.slotday === obj.slotday &&
              t.startTime === obj.startTime &&
              t.endTime === obj.endTime &&
              t.slotPlace === obj.slotPlace
            ));
          });

        
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
    
    
    getTACourses(TAId:any)
    {
      this.profAndTa.getTACourses(TAId).subscribe(
        response => {
          this.myCourses=response;
          console.log('Courssssssssss',this.myCourses);
      
      },
      error => {
        console.error('Error!', error);
        
        
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
    
}
