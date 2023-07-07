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
  levelDisabled: any;
  courseDisabled: any;
  deptDisabled:any;
  constructor(private route: ActivatedRoute,private router: Router, private studendService: StudentsService) {
   
  }
  previousPath: string = '';
  ngOnInit(): void {

  // You can display the path to the user using a toast, alert, or other UI element
    this.studendService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
      
    });
    this.studendService.getAllDepartmentswithGeneral().subscribe({
      next:(response)=> this.Departments=response
      
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
    this.courseDisabled = false;

    this.levelDisabled = true;
  this.deptDisabled = true;
    console.log("select course "+course );
    this.studendService.getCourseTopbyParam50(course).subscribe({
      next:(response)=> this.students=response
      
    });
  }
  selectDeptAndLevel(selectedLevel: string, selectedDept: string): void {
    const deptSelect = document.getElementById('deptSelect') as HTMLSelectElement;
    const levelSelect = document.getElementById('levelSelect') as HTMLSelectElement;
  
    if (selectedDept && !selectedLevel) {
      // Call function when only department is selected
      console.log('Only department selected:', selectedDept);
      this.studendService.getDeptTopbyParam50(selectedDept).subscribe({
              next:(response)=> this.students=response     
            });
      // Call your specific function here
      // functionName(selectedDept);
    } else if (!selectedDept && selectedLevel) {
      // Call function when only level is selected
      console.log('Only level selected:', selectedLevel);
      this.studendService.getLevelTopbyParam50(selectedLevel).subscribe({
              next:(response)=> this.students=response
              
            });
      // Call your specific function here
      // functionName(selectedLevel);
    } else if (selectedDept && selectedLevel) {
      // Call function when both department and level are selected
      console.log('Both department and level selected:', selectedDept, selectedLevel);
      this.studendService.getTopLevelAndDept(selectedLevel,selectedDept).subscribe({
              next:(response)=> this.students=response
              
            });
      // Call your specific function here
      // functionName(selectedDept, selectedLevel);
    } else {
      // No selection made
      console.log('No selection made.');
    }
  }
  
  // selectDeptAndLevel(level:any="",dept:any=""){
  //   console.log("dept=",dept,"level=",level)
  //   if(dept != "" && level != ""){
  //     this.studendService.getTopLevelAndDept(level,dept).subscribe({
  //       next:(response)=> this.students=response
        
  //     });
  //   }
  //   if(dept != "" && level == ""){
  //     this.studendService.getDeptTopbyParam50(dept).subscribe({
  //       next:(response)=> this.students=response     
  //     });

  //   }
  //   if(dept == "" && level != "") {
  //     this.studendService.getLevelTopbyParam50(level).subscribe({
  //       next:(response)=> this.students=response
        
  //     });
  //   }
  // }
 
  

  // onChange($event:any)
  // {
  //   let filterData = _.filter(this.data,(item) =>{
  //     return item.level.toLowerCase() == $event.value.toLowerCase();
  //   })
  //   this.dataSource = new MatTableDataSource(filteredData);
  // }
}
