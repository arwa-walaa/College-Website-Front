import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';
declare var google:any;

@Component({
  selector: 'app-statistics-courses',
  templateUrl: './statistics-courses.component.html',
  styleUrls: ['./statistics-courses.component.css']
})
export class StatisticsCoursesComponent {
  showComparison = false;

  Courses:any;
  Departments:any;
  Years:any;
  data:any;
couseId:any
DepatmentCode:any
year:any
  courseInfo: any;
  courseStat: any;
  pased!: number; 
  faild!:number;
  AvgGrades: any;
  courseName: any;
  courseID:any;

  constructor(private router: Router, private studendService: StudentsService,
    private route: ActivatedRoute,private profAndTa:ProfessorAndTaService ,private http: HttpClient,private _AuthService:AuthService) {
  }

  ngOnInit(): void {

    // علي الاغلب هيتغيروا شوية لان متخيلاهم بيتنفذوا ورا بعض زي ما جلال كان بيقول مش كل واحدة منفصلة 
    this.studendService.getAllCourses().subscribe({
      next:(response)=> this.Courses=response
      
    });
    this.studendService.getAllDepartments().subscribe({
      next:(response)=> this.Departments=response
      
    });
    this.studendService.getCourseYears().subscribe({
      next:(response)=>{this.Years=response
      console.log("years,",this.Years)} 
      
    });
 
 


   
    
    
  }
test(){
  console.log("select year "+ this.year );
  console.log("select course "+this.couseId );
  console.log("select dept"+this.DepatmentCode );
 
    this.profAndTa.returnCourseStat(this.couseId,this.year,this.DepatmentCode).subscribe((courseStat: any) => {
      this.courseStat = courseStat;
      // this.pased = this.courseStat[0].num_students_passed;
      // this.faild = this.courseStat[0].num_students_failed;
      this.pased = Number(this.courseStat[0].num_students_passed);
      this.faild = Number(this.courseStat[0].num_students_failed);
      // console.log(this.pased)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(() => {
        this.drawPieChart(this.pased,this.faild) 
      });
  
      // google.charts.setOnLoadCallback(this.drawHistogram);
    });
    this.profAndTa.returnCourseStudent(this.couseId,this.year,this.DepatmentCode).subscribe((studentStat: any) => {
       console.log("studentStat==",studentStat)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(this.drawHistogram(studentStat));
  
    });
    this.profAndTa.returnGradeAvg(this.couseId,this.year,this.DepatmentCode).subscribe((AvgGrades: any) =>
     {this.AvgGrades=AvgGrades
    console.log("AvgGrades",this.AvgGrades)});
 

}


  SelectDept(dept:any)
  {
   
    this.DepatmentCode=dept
    
  }

  SelectCourse(course:any)
  {
   
    this.couseId=course
  }
  SelectYear(year:any)
  {
   
   this.year=year
   
  }

 


  drawPieChart(numStudentsPassed: number , numStudentsFailed: number){
    
    // Create the data table.
    // console.log('passed',numStudentsPassed);
    // console.log('failed',numStudentsFailed);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Success');
    data.addColumn('number', 'Number of Students');
    data.addRows([
      ['Succeeded',numStudentsPassed ],
      ['Failed',numStudentsFailed]
    ]);

    // Set chart options
    var options = {pieHole: 0.4,
    'legend':'bottom',
    'width':375,
    'height':400,
    colors:[ '#388E3C','#D32F2F'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    // chart.draw(data, options);
    try {
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing chart: ', error);
    }
  }

  drawHistogram(studentData:any){
    // console.log("studentData",studentData)
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Student');
    data.addColumn('number', 'Grade');
    
    // Add data from studentData array to DataTable
    for(var i=0; i<studentData.length; i++){
      data.addRow([studentData[i].studentId, studentData[i].Result]);
    }
  
    // Set chart options
    var options = {
      histogram: {bucketSize: 10, minValue: 0, maxValue: 100, hideBucketItems:true},
      'legend':{ position: 'none' },
      'width':480,
      'height':400,
      hAxis: 
      {
        title: 'Grade',
       
      },
      vAxis: {
        title: 'Number of Students',        
      },
      colors:['#141ba2'],
    };
  
    var chart = new google.visualization.Histogram(document.getElementById('histogram'));
    chart.draw(data, options);
  }
}
