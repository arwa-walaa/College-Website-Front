import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfficeHoursServiceService } from '../office-hours-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-office-hours-component',
  templateUrl: './office-hours-component.component.html',
  styleUrls: ['./office-hours-component.component.css']
})
export class OfficeHoursComponentComponent implements OnInit {
  locations: any;
  departments: any;
  professors: any;
  TAs: any;
 

  constructor(private _OfficeHoursServiceService:OfficeHoursServiceService,private router:Router) {}
  title='Office Hours';
  p: number = 1;
  count: number = 5;
  tableData: any;

  ngOnInit(): void {
    this._OfficeHoursServiceService.getOfficeHours().subscribe({
     next:(response)=>this.tableData =response
    })

    this._OfficeHoursServiceService.returnAllLocations().subscribe({
      next:(response)=>this.locations =response
     })

     this._OfficeHoursServiceService.returnAllDepartments().subscribe({
      next:(response)=>this.departments =response
     })

     this._OfficeHoursServiceService.returnAllProfessore().subscribe({
      next:(response)=>this.professors =response
     })

     this._OfficeHoursServiceService.returnAllTAs().subscribe(      // next:(response)=>this.TAs =response
    
      response => {
        this.TAs=response;
    },
    error => {
      console.error('Error!', error);   
    });
     

  }

  selectProfessorName(teacherName:any)
  {
    this._OfficeHoursServiceService.selectTeacherOfficeHour(teacherName).subscribe({
      next:(response)=>this.tableData =response
     })
  }

  selectTAName(teacherName:any)
  {
    this._OfficeHoursServiceService.selectTeacherOfficeHour(teacherName).subscribe({
      next:(response)=>this.tableData =response
     })
  }

  searchText='';
  navigateToHome(){
    this.router.navigate(['home_login']); 
  }
 
}
