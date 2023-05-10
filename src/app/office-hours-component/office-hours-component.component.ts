import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfficeHoursServiceService } from '../office-hours-service.service';



@Component({
  selector: 'app-office-hours-component',
  templateUrl: './office-hours-component.component.html',
  styleUrls: ['./office-hours-component.component.css']
})
export class OfficeHoursComponentComponent implements OnInit {
  constructor(private _OfficeHoursServiceService:OfficeHoursServiceService) {}
  title='Office Hours';
  p: number = 1;
  count: number = 5;
  tableData: any;

  ngOnInit(): void {
    this._OfficeHoursServiceService.getOfficeHours().subscribe({
     next:(response)=>this.tableData =response
    })}
  // data2=[
  //   {professorOrTaName:"Iman Helal" ,email:"i.helal@fcai.cu.edu.eg", department:"IS" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Ali Zedan" ,email:"a.zedan@fcai.cu.edu.eg", department:"IS" ,officeHours:"12:1 pm", day:"Saturday", location:"new building, 1st floor"},

  //   {professorOrTaName:"Ahame Galal" ,email:"a.galal@fcai.cu.edu.eg", department:"IT" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Noha Nagy" ,email:"n.nagy@fcai.cu.edu.eg", department:"IS" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Sara Elnady" ,email:"s.elnady@fcai.cu.edu.eg", department:"CS" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Sara Elnady" ,email:"s.elnady@fcai.cu.edu.eg", department:"CS" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Dalia mazen" ,email:"d.mazen@fcai.cu.edu.eg", department:"DS" ,officeHours:"12:1 pm", day:"Tuesday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Khaled Maged" ,email:"k.maged@fcai.cu.edu.eg", department:"IS" ,officeHours:"12:1 pm", day:"Monday", location:"new building, 1st floor"},
  //   {professorOrTaName:"Kamal Essam" ,email:"k.essam@fcai.cu.edu.eg", department:"IT" ,officeHours:"12:1 pm", day:"Sunday", location:"new building, 1st floor"}
    
    
 
  //  ]
  searchText='';

}
