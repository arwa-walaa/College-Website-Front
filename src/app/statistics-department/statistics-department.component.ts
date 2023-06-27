import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
declare var google:any;

@Component({
  selector: 'app-statistics-department',
  templateUrl: './statistics-department.component.html',
  styleUrls: ['./statistics-department.component.css']
})

export class StatisticsDepartmentComponent {
  private _AdminService: AdminService;
  numStudents:any;
  GPADepartments: any;
  histogramData:any;
  departments: any;

  constructor(adminService: AdminService,
    private _AuthService:AuthService) {
    this._AdminService = adminService;
  } 

  
  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this._AdminService.get_Number_Of_Students_In_Department().subscribe(
        data => {
          this.numStudents = data;
          console.log('number of students', this.numStudents);
          this.drawPieChart(this.numStudents);
        },
        error => {
          console.error('Error!', error);
        }
      );
        /////////////////////////////
        this._AdminService.get_GPA_distribution_In_Department().subscribe(
          (data: any) => {
            console.log('GPA Distribution by Department', data);
        
            this.departments= Object.keys(data);
            console.log('departments', this.departments);
  
          },
          error => {
            console.error('Error!', error);
          }
        );
        ////////////////////////////
      this._AdminService.get_GPA_distribution_In_Department().subscribe(
        (data: any) => {
          console.log('GPA Distribution by Department', data);
          this.histogramData = [];
          this.departments=[];

          google.charts.setOnLoadCallback(() => {
          for (let department in data) {
            console.log('dept', department);
            console.log('data of dept', data[department]);
            this.histogramData.push({ department: department, data: data[department] });
            this.departments.push(department);
            this.drawHistogram(department, data[department]);
          }
        });
        },
        error => {
          console.error('Error!', error);
        }
      );
    });
  }

  drawPieChart(data: any[]) {
    google.charts.load('current', {packages: ['corechart']});
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Department');
    chartData.addColumn('number', 'Number of Students');
    data.forEach(row => {
      chartData.addRow([row.departmentCode, row.count]);
    });
  
    var options = {
      legend: 'top',
      width: 370,
      height: 370,
      colors: ['#3E8DE3', '#04060D', '#C70039', '#143AA2', '#BFC6D6'],
    };
  
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(chartData, options);
  }

  drawHistogram(department: string, data: any[]) {       
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Student');
    chartData.addColumn('number', 'GPA');
    data.forEach(row => {
      chartData.addRow([row.studentId, row.GPA]);
    });
  
    // Set chart options
    var options = {
      // title: 'GPA Distribution in ' + department + ' Department',
      histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
      hAxis: 
      {
        title: 'GPA',
        ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]
      },
      vAxis: {
        title: 'Number of Students',        
      },
      legend:{ position: 'none' },
      
      width:365,
      height:400,
      colors:['#141ba2'],
    };
    
    var chart = new google.visualization.Histogram(document.getElementById(department));
    chart.draw(chartData, options);
  }

}
