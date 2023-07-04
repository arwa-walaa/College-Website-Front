import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';
declare var google:any;


@Component({
  selector: 'app-statistics-courses-compare',
  templateUrl: './statistics-courses-compare.component.html',
  styleUrls: ['./statistics-courses-compare.component.css']
})

export class StatisticsCoursesCompareComponent {
  Courses:any;
  Departments:any;
  Years:any;
  data:any;
  couseId:any
  DepatmentCode:any
  year:any
  couseId2:any
DepatmentCode2:any
year2:any
  courseInfo: any;
  courseStat: any;
  pased!: number; 
  faild!:number;
  AvgGrades: any;
  courseStat2: any;
  AvgGrades2: any;
 

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

calculate(){
  console.log("course1=",this.couseId,this.year,this.DepatmentCode)
  this.profAndTa.returnCourseStat(this.couseId,this.year,this.DepatmentCode).subscribe((courseStat: any) => {
    this.courseStat = courseStat;
    // this.pased = this.courseStat[0].num_students_passed;
    // this.faild = this.courseStat[0].num_students_failed;
    this.pased = Number(this.courseStat[0].num_students_passed);
    this.faild = Number(this.courseStat[0].num_students_failed);
    // console.log(this.pased)
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.drawPieChart1(this.pased,this.faild) 
    });

    // google.charts.setOnLoadCallback(this.drawHistogram);
  });
  this.profAndTa.returnCourseStudent(this.couseId,this.year,this.DepatmentCode).subscribe((studentStat: any) => {
    // console.log("studentStat==",studentStat)
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawHistogram1(studentStat));

  });
 
  this.profAndTa.returnGradeAvg(this.couseId,this.year,this.DepatmentCode).subscribe((AvgGrades: any) => {this.AvgGrades=AvgGrades});
 ///////////////////////////////////////Second course////////////////////
    console.log("course2=",this.couseId2,this.year2,this.DepatmentCode2)
    this.profAndTa.returnCourseStat(this.couseId2,this.year2,this.DepatmentCode2).subscribe((courseStat2: any) => {
      this.courseStat2 = courseStat2;
      // this.pased = this.courseStat[0].num_students_passed;
      // this.faild = this.courseStat[0].num_students_failed;
      this.pased = Number(this.courseStat2[0].num_students_passed);
      this.faild = Number(this.courseStat2[0].num_students_failed);
      // console.log(this.pased)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(() => {
        this.drawPieChart2(this.pased,this.faild) 
      });
  
      // google.charts.setOnLoadCallback(this.drawHistogram);
    });
    this.profAndTa.returnCourseStudent(this.couseId2,this.year2,this.DepatmentCode2).subscribe((studentStat2: any) => {
      // console.log("studentStat==",studentStat)
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(this.drawHistogram2(studentStat2));
  
    });
    this.profAndTa.returnGradeAvg(this.couseId2,this.year2,this.DepatmentCode2).subscribe((AvgGrades2: any) => {this.AvgGrades2=AvgGrades2});
    
  

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

  SelectDept2(dept:any)
  {
   
    this.DepatmentCode2=dept
    
  }

  SelectCourse2(course:any)
  {
   
    this.couseId2=course
  }
  SelectYear2(year:any)
  {
   
   this.year2=year
   
  }


  drawPieChart1(numStudentsPassed: number , numStudentsFailed: number){
    
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
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart1'));
    // chart.draw(data, options);
    try {
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing chart: ', error);
    }
  }

  drawHistogram1(studentData:any){
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
  
    var chart = new google.visualization.Histogram(document.getElementById('histogram1'));
    chart.draw(data, options);
  }

  // محتاجة نظبط الداتا بتاعتها
  drawPieChart2(numStudentsPassed: number , numStudentsFailed: number){
    
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
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart2'));
    // chart.draw(data, options);
    try {
      chart.draw(data, options);
    } catch (error) {
      console.error('Error drawing chart: ', error);
    }
  }

  // محتاجة نظبط الداتا بتاعتها
  drawHistogram2(studentData:any){
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
  
    var chart = new google.visualization.Histogram(document.getElementById('histogram2'));
    chart.draw(data, options);
  }
}
