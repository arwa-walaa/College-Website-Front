import { Component } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

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
    constructor(private ProfService: ProfessorTAService,private profAndTa:ProfessorAndTaService,private router:Router,private _AuthService:AuthService ) {}
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
    navigateToScheduale(){
      this.router.navigate(['Schedule']);
    }
   navigateToHome(){
      const token = this._AuthService.getToken();
  
            if (token) { // check if the token is valid
              this.profAndTa.getUserType(token).subscribe((type: any) => {
                if (type[0].Type === "Professor" || type[0].Type === "TA") {
                  
                  this.router.navigate(['/drTaHome']);
                }
                else if (type[0].Type === "Student") {
                  this.router.navigate(['/home_login']);
                }
                else if (type[0].Type === "Admin") {
                  this.router.navigate(['/home_admin']);
                }
              });
              // localStorage.setItem('loggedIn', 'true'); // set the flag in local storage
            }
      // this.router.navigate(['home_login']); 
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