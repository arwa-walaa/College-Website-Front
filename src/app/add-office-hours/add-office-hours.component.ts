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

  submit(){
    
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
