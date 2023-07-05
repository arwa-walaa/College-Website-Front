import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';
;



@Component({
  selector: 'app-add-office-hours',
  templateUrl: './add-office-hours.component.html',
  styleUrls: ['./add-office-hours.component.css']
})
export class AddOfficeHoursComponent {
  flag:any=null

  constructor(private router: Router,
    private route: ActivatedRoute,
    private profAndTa:ProfessorAndTaService ,
    private http: HttpClient,
    private _AuthService:AuthService) {
  
  }
  officeHours: any[] = [{ startTime: '', endTime: '',location:'',Day:'',type:'',
  name:'',email:'',department:'',id:'' }];
  weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  ngOnInit() {
    const token = this._AuthService.getToken();
    this.profAndTa.getUserType(token).subscribe((type: any) => {
      if (type[0].Type === 'Professor') {
        this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData: any) => {
          this.officeHours[0].name = ProfessorData[0].professorName;
          this.officeHours[0].email = ProfessorData[0].email;
          this.officeHours[0].department = ProfessorData[0].departmentCode;
          this.officeHours[0].id = ProfessorData[0].professorId;
          this.officeHours[0].type = type[0].Type;
        });
      } else if (type[0].Type === 'TA') {
        this.profAndTa.getTAInfo(token).subscribe((TaData: any) => {
          this.officeHours[0].name = TaData[0].TAName;
          this.officeHours[0].email = TaData[0].email;
          this.officeHours[0].department = TaData[0].departmentCode;
          this.officeHours[0].id = TaData[0].TAId;
          this.officeHours[0].type = type[0].Type;
          

        });
      }
    });
  }
  addOfficeHour() {
    const token=this._AuthService.getToken();
    this.profAndTa.getUserType(token).subscribe((type:any ) => {
      if(type[0].Type==="Professor"){
        this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
          console.log("prof==",ProfessorData)
        this.officeHours.push({ startTime: '', endTime: '',location:'',Day:'',
        type: type[0].Type,name:ProfessorData[0].professorName,email:ProfessorData[0].email,
        department:ProfessorData[0].departmentCode,id:ProfessorData[0].professorId });
       
      });
    }
    else if(type[0].Type==="TA"){
      this.profAndTa.getTAInfo(token).subscribe((TaData:any ) => {
       this.officeHours.push({ startTime: '', endTime: '',location:'',Day:'',type: type[0].Type ,
       name:TaData[0].TAName,email:TaData[0].email,department:TaData[0].departmentCode,id:TaData[0].TAId  });

       
      });
  
    }
  


  });


   
  }
   updateDay(index: number, day: string) {
    this.officeHours[index].Day = day;
  }
 
  submit() {
   

    console.log("this.officeHours",this.officeHours)
    console.log("this.officeHours.id",this.officeHours[0].id)
    console.log("this.officeHours.endTime",this.officeHours[0].endTime)
    console.log("this.officeHours.startTime",this.officeHours[0].startTime)
    // Loop through the form inputs and update the corresponding office hours
    // console.log("===============start test=========");
    let url = 'http://127.0.0.1:8000/api/insertOfficeHour';
    let options = { headers: { 'Content-Type': 'application/json' } };
    let professorOrTAId = this.officeHours[0].id;; // replace with the actual ID
    
    this.http.post(url + '/' + professorOrTAId, this.officeHours, options).subscribe(
        (response) => {
            console.log("===============", response)
            this.flag=true;
            this.router.navigate(['/home_dr_ta']);
        }, (error) => {
            console.error("erooooor", error);
            this.flag=false;
            
        });
    
    console.log("test=",this.officeHours);
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

  
}
