import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-selection',
  templateUrl: './program-selection.component.html',
  styleUrls: ['./program-selection.component.css']
})
export class ProgramSelectionComponent {
 
 
  // public data: string[] = ['Cs', 'IS', 'DS', 'AI', 'IT'];
  public selected:string[]=[];
  DepartmentsData:any;
  data = {
    array: this.selected,
    studentId: null
  };
  flag:any=null;
 
  constructor(private router: Router,private studendService: StudentsService,private _AuthService:AuthService,private http: HttpClient) {}
  ngOnInit(): void {
     
    const token=this._AuthService.getToken();
    this.studendService.returnAllDepartments().subscribe((DepartmentsData:any ) => {
      // this.DepartmentsData=DepartmentsData;
      this.DepartmentsData= DepartmentsData.map((obj: { departmentCode: any; }) => obj.departmentCode);
      // console.log(this.DepartmentsData)
      

    });
    this.studendService.getStudentInfo(token).subscribe((StudentData:any ) => {
    

      this.assignStudentId(StudentData[0].studentId)
      
      
    });
 
  }
  assignStudentId(studentId:any)
  {
    this.data['studentId']=studentId;
  }
  update(selectedValue: string, index: number): void {
    this.selected[index] = selectedValue;
    this.RemoveElementFromStringArray(selectedValue);
}
  RemoveElementFromStringArray(element: string):void {
    this.DepartmentsData.forEach((value: string,index: number)=>{
        if(value==element) this.DepartmentsData.splice(index,1);
    });
}
getArrayLength(arr:any) {
  let count = 0;
  for (let i in arr) {
    
      count++; 
  }
  return count;
}
saveData() {
  //console.log(this.getArrayLength(this.selected));
  if (this.getArrayLength(this.selected)<5) {
    // alert("Please select all preferences");
    
    this.flag=true;
    
  }
  else
  {

   this.flag=false;
  this.data['array']=this.selected;
  let url = 'http://127.0.0.1:8000/api/registerPerefernces';
   let options = { headers: { 'Content-Type': 'application/json' } };
  this.http.post(url, this.data,options).subscribe(
    (response) =>{
      console.log(response);

      this.router.navigate(['/home_login']);
    }
    
   ,
    (error) => {console.error("error",error),
    this.flag=true;}
    
   
  );
 
  }
}
navigateToHome(){
  this.router.navigate(['home_login']); 
}

navigateToregisterdCoursesAndResults(){
  this.router.navigate(['registerdCoursesAndResults']);
}
}
