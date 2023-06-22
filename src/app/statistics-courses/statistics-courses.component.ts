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

    //another method to get all years 



    this.route.queryParams.subscribe(params => {
      //////////////////  
       const test = params['courseName'];
       const test2 = params['courseID'];
       this.courseName=test;
       this.courseID = test2;
       console.log('Course Name:',test);
       console.log('Course ID:',test2);
      //////////////////  
       this.courseInfo=params;  
       // console.log('courseInfo==',this.courseInfo);
         

       this.profAndTa.returnCourseStat(this.courseInfo.courseID).subscribe((courseStat: any) => {
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
       this.profAndTa.returnCourseStudent(this.courseInfo.courseID).subscribe((studentStat: any) => {
         // console.log("studentStat==",studentStat)
         google.charts.load('current', {'packages':['corechart']});
         google.charts.setOnLoadCallback(this.drawHistogram(studentStat));
 
       });
       this.profAndTa.returnGradeAvg(this.courseInfo.courseID).subscribe((AvgGrades: any) => {this.AvgGrades=AvgGrades});
       }
     );
    
  }



  SelectDept(dept:any)
  {
    console.log("select dept"+dept );
    //this.studendService.getDeptTopbyParam50(dept).subscribe({
    //  next:(response)=> this.data=response   
    //});
  }

  SelectCourse(course:any)
  {
    console.log("select course "+course );
    //this.studendService.getCourseTopbyParam50(course).subscribe({
    //  next:(response)=> this.data=response 
    //});
  }
  SelectYear(year:any)
  {
    console.log("select year "+ year );
    //this.studendService.getLevelTopbyParam50(year).subscribe({
    //  next:(response)=> this.data=response  
    //});
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
    colors:['#3E8DE3', '#141ba2'],
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
      colors:['#141ba2'],
    };
  
    var chart = new google.visualization.Histogram(document.getElementById('histogram'));
    chart.draw(data, options);
  }
}
