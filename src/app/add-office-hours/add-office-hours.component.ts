import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-office-hours',
  templateUrl: './add-office-hours.component.html',
  styleUrls: ['./add-office-hours.component.css']
})
export class AddOfficeHoursComponent implements OnInit {
  officeHoursForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.officeHoursForm = this.formBuilder.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      location: ['', [Validators.required]]
    }, { validator: this.checkTimeValidity });
  }

//   constructor(private http: HttpClient,private router: Router,private _AuthService:AuthService,
//     private profAndTa:ProfessorAndTaService,private ProfService:ProfessorTAService) {
//   }

//   officeHours: any[] = [{ startTime: '', endTime: '',location:'',Day:'',type:'Professor',name: '' , email: '' , department: '' }];
//   weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
//   addOfficeHour(name:any, email:any, department:any) {
//     this.officeHours.push({ startTime: '', endTime: '',location:'',Day:'',type:'Professor',name: name , email: email , department: department});
//   }
//    updateDay(index: number, day: string) {
//     this.officeHours[index].Day = day;
//   }
//   OnInit()
//   {
//     console.log("====",this.officeHours);
//     const token=this._AuthService.getToken();
//     this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
     
//     });
//   }
//   submit() {
    
  }

  checkTimeValidity(group: FormGroup): any {
    const startTime = group.controls['startTime'].value;
    const endTime = group.controls['endTime'].value;

    if (startTime && endTime) {
      const startDate = new Date(`2023-06-13T${startTime}`);
      const endDate = new Date(`2023-06-13T${endTime}`);

      if (startDate >= endDate) {
        return { invalidTime: true, message: 'End time must be after start time' };
      }

      const startHours = startDate.getHours();
      const endHours = endDate.getHours();

      if (startHours < 8 || startHours >= 19 || endHours < 8 || endHours >= 19) {
        return { invalidTime: true, message: 'Start and end times must be between 8:00 AM and 7:00 PM' };
      }
    }
  }
}
