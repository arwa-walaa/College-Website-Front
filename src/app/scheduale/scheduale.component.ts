// import { Component, ElementRef, ViewChild } from '@angular/core';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Router } from '@angular/router';

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
  constructor(private studendService: StudentsService,private _AuthService:AuthService,private router:Router) {}
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
  // downloadSchedule() {
  //   // Get the printable table div
  //   const printableTable = document.getElementById('printable-table');
  
  //   // Check if printableTable exists and is a valid element
  //   if (!printableTable || !(printableTable instanceof HTMLElement)) {
  //     console.error('Printable table element not found');
  //     return;
  //   }
  
  //   // Clone the table and remove any Angular bindings
  //   const clonedTable = printableTable.cloneNode(true) as HTMLElement;
  //   clonedTable.querySelectorAll('*').forEach((el) => {
  //     el.removeAttribute('ng-reflect-ng-for');
  //     el.removeAttribute('ng-version');
  //   });
  
  //   // Open a new window with only the table content
  //   const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  
  //   // Check if printWindow is not null before accessing its document property
  //   if (printWindow !== null) {
  //     printWindow.document.write('<html><head><title>Schedule</title>');
  //     printWindow.document.write('</head><body>');
  //     printWindow.document.write(clonedTable.innerHTML);
  //     printWindow.document.write('</body></html>');
  
  //     // Print and close the new window
  //     printWindow.document.close();
  //     printWindow.focus();
  //     printWindow.print();
  //     printWindow.close();
  
  //     // Set the display property of the printable table element back to its original value
  //     printableTable.style.display = 'block';
  //   } else {
  //     console.error('Failed to open print window');
  //   }
  // }
  async downloadSchedule() {
    // Get the printable table div
    const printableTable = document.getElementById('printable-table');
  
    // Check if printableTable exists and is a valid element
    if (!printableTable || !(printableTable instanceof HTMLElement)) {
      console.error('Printable table element not found');
      return;
    }
  
    try {
      // Clone the table and remove any Angular bindings
      const clonedTable = printableTable.cloneNode(true) as HTMLElement;
      clonedTable.querySelectorAll('*').forEach((el) => {
        el.removeAttribute('ng-reflect-ng-for');
        el.removeAttribute('ng-version');
      });
  
      // Open a new window with only the table content
      const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  
      // Check if printWindow is not null before accessing its document property
      if (printWindow !== null) {
        printWindow.document.write('<html><head><title>Schedule</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(clonedTable.innerHTML);
        printWindow.document.write('</body></html>');
  
        // Wait for the window to fully load before triggering the print action
        await new Promise(resolve => printWindow.onload = resolve);
  
        // Use the native browser functionality to print to PDF
        printWindow.print();
  
        // Close the new window
        printWindow.close();
  
        // Set the display property of the printable table element back to its original value
        printableTable.style.display = 'block';
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  navigateToHome(){
    this.router.navigate(['home_login']); 
  } 
  
  
  
 
  
}
