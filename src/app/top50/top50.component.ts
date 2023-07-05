import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StudentsService } from '../students.service';
// import { DataService } from './data.service';
// import * as _ from 'lodash';
@Component({
  selector: 'app-top50',
  templateUrl: './top50.component.html',
  styleUrls: ['./top50.component.css']
})
export class Top50Component {
  title='Top 50';
  Levels_data: any = ['First Level', 'Second Level', 'Third Level', 'Fourth Level'];
  Courses:any;
  Departments:any;
  students:any;
  constructor(private route: ActivatedRoute,private router: Router, private studendService: StudentsService) {
   
  }
  previousPath: string = '';
  ngOnInit(): void {

  // You can display the path to the user using a toast, alert, or other UI element
    this.studendService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
      
    });
    this.studendService.getAllDepartments().subscribe({
      next:(response)=> this.Departments=response
      
    });
    
  }
  SelectDept(dept:any)
  {
    console.log("select dept"+dept );
    this.studendService.getDeptTopbyParam50(dept).subscribe({
      next:(response)=> this.students=response     
    });
  }
  navigateToAnnoucements() {
    this.router.navigate(['Announcements']);
  }
  navigateToHome(){
    this.router.navigate(['home_login']); 
  }

  SelectCourse(course:any)
  {
    console.log("select course "+course );
    this.studendService.getCourseTopbyParam50(course).subscribe({
      next:(response)=> this.students=response
      
    });
  }
  SelectLevel(level:any)
  {
    console.log("select Level "+level );
    this.studendService.getLevelTopbyParam50(level).subscribe({
      next:(response)=> this.students=response
      
    });
  }
  

  // onChange($event:any)
  // {
  //   let filterData = _.filter(this.data,(item) =>{
  //     return item.level.toLowerCase() == $event.value.toLowerCase();
  //   })
  //   this.dataSource = new MatTableDataSource(filteredData);
  // }
}
