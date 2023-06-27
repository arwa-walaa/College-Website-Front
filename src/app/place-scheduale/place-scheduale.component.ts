import { Component } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';

@Component({
  selector: 'app-place-scheduale',
  templateUrl: './place-scheduale.component.html',
  styleUrls: ['./place-scheduale.component.css']
})
export class PlaceSchedualeComponent {

  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  times = ['08:00:00', '09:30:00', '11:15:00', '12:45:00', '02:30:00', '04:00:00', '05:30:00'];
    ScheduleInfo: any;
    public places:any[]=[] 
   public array:any[]=[]
  Semeter: any='Second';
    constructor(private ProfService: ProfessorTAService) {}
    ngOnInit(): void {
      // this.getScheduale()
    //  this.places=[...this.ProfService.returnAllPlaces()]
     this.ProfService.returnAllPlaces().subscribe((places:any) => {
      this.places = places;
      console.log("=====",this.places)
    });
    //  console.log("=====",this.places)
      
    }
    update(place:any){
      this.getScheduale(place)
    }
    getScheduale(place:any){
      this.ProfService.returnSchedualePlace(place,this.Semeter).subscribe({
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
        
    
       
      }
      return result;
    }
    
    
  }