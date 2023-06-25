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
 // histogramData:string[] = [];
  histogramData:any;

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

      this._AdminService.get_GPA_distribution_In_Department().subscribe(
        (data: any) => {
          console.log('GPA Distribution by Department', data);
          this.histogramData = [];

          for (let department in data) {
            console.log('dept', department);
            console.log('data of dept', data[department]);
            this.histogramData.push({ department: department, data: data[department] });
            this.drawHistogram(department, data[department]);
          }
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

  // drawHistogramIS(data: any[]) {
  //   google.charts.load('current', {packages: ['corechart']});
  //   var chartData = new google.visualization.DataTable();
  //   chartData.addColumn('string', 'Student');
  //   chartData.addColumn('number', 'GPA');
  //   data.forEach(row => {
  //     chartData.addRow([row.studentId, row.GPA]);
  //   });
  
  //   // Set chart options
  //   var options = {
  //     histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
  //     hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
  //     legend:{ position: 'none' },
  //     width:365,
  //     height:400,
  //     colors:['#141ba2'],
  //     };

  //     var chart = new google.visualization.Histogram(document.getElementById('chart2'));
  //     chart.draw(chartData, options);
  // }

  drawHistogram(department: string, data: any[]) {
    //google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(() => {
          
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Student');
    chartData.addColumn('number', 'GPA');
    data.forEach(row => {
      chartData.addRow([row.studentId, row.GPA]);
    });
  
    // Set chart options
    var options = {
      title: 'GPA Distribution in ' + department + ' Department',
      histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
      hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
      legend:{ position: 'none' },
      width:365,
      height:400,
      colors:['#141ba2'],
    };
  
    var chart = new google.visualization.Histogram(document.getElementById(`chart-${department}`));
    // var chart = new google.visualization.Histogram(document.getElementById('IS'));
    chart.draw(chartData, options);

  });
  }

  // drawHistogramCS(){
  //   // Create the data table.
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'Stident');;
  //   data.addColumn('number', 'GPA');
    
  //   data.addRows([
  //     ['20190078', 2.3],
  //     ['20190475', 3.6],
  //     ['20190143', 1.4], 
  //     ['20190186', 2.9],
  //     ['20190028', 3.3],
  //     ['20190475', 3.8],
  //   ]);
  //   // Add data from studentData array to DataTable
  //   //for(var i=0; i<studentData.length; i++){
  //   //  data.addRow([studentData[i].studentId, studentData[i].Result]);
  //   //}

  //   // Set chart options
  //   var options = {
  //     histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
  //     hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
  //     legend:{ position: 'none' },
  //     width:365,
  //     height:400,
  //     colors:['#141ba2'],
  //     };

  //   // Instantiate and draw our chart, passing in some options.
  //   var chart = new google.visualization.Histogram(document.getElementById('chart1'));
  //   chart.draw(data, options);
  // }

  // drawHistogramIS(){
  //   // Create the data table.
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'Student');;
  //   data.addColumn('number', 'GPA');
    
  //   data.addRows([
  //     ['20190078', 2.1],
  //     ['20190475', 3.6],
  //     ['20190143', 1.2], 
  //     ['20190186', 2.9],
  //     ['20190028', 1.8],
  //     ['20190475', 3.0],
  //     ['20190475', 2.6],
  //   ]);
  //   // Add data from studentData array to DataTable
  //   //for(var i=0; i<studentData.length; i++){
  //   //  data.addRow([studentData[i].studentId, studentData[i].Result]);
  //   //}

  //   // Set chart options
  //   var options = {
  //     histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
  //     hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
  //     legend:{ position: 'none' },
  //     width:365,
  //     height:400,
  //     colors:['#141ba2'],
  //     };

  //   // Instantiate and draw our chart, passing in some options.
  //   var chart = new google.visualization.Histogram(document.getElementById('chart2'));
  //   chart.draw(data, options);
  // }

  drawHistogramIT(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Stident');;
    data.addColumn('number', 'GPA');
    
    data.addRows([
      ['20190078', 2.1],
      ['20190475', 3.6],
      ['20190143', 1.2], 
      ['20190186', 2.9],
      ['20190028', 1.8],
      ['20190475', 3.0],
      ['20190475', 2.6],
    ]);
    // Add data from studentData array to DataTable
    //for(var i=0; i<studentData.length; i++){
    //  data.addRow([studentData[i].studentId, studentData[i].Result]);
    //}

    // Set chart options
    var options = {
      histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
      hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
      legend:{ position: 'none' },
      width:365,
      height:400,
      colors:['#141ba2'],
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Histogram(document.getElementById('chart3'));
    chart.draw(data, options);
  }

  drawHistogramDS(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Stident');;
    data.addColumn('number', 'GPA');
    
    data.addRows([
      ['20190078', 2.1],
      ['20190475', 3.6],
      ['20190143', 1.2], 
      ['20190186', 2.9],
      ['20190028', 1.8],
      ['20190475', 3.0],
      ['20190475', 2.6],
    ]);
    // Add data from studentData array to DataTable
    //for(var i=0; i<studentData.length; i++){
    //  data.addRow([studentData[i].studentId, studentData[i].Result]);
    //}

    // Set chart options
    var options = {
      histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
      hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
      legend:{ position: 'none' },
      width:365,
      height:400,
      colors:['#141ba2'],
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Histogram(document.getElementById('chart4'));
    chart.draw(data, options);
  }

  drawHistogramAI(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Stident');;
    data.addColumn('number', 'GPA');
    
    data.addRows([
      ['20190078', 2.1],
      ['20190475', 3.6],
      ['20190143', 1.2], 
      ['20190186', 2.9],
      ['20190028', 1.8],
      ['20190475', 3.0],
      ['20190475', 2.6],
    ]);
    // Add data from studentData array to DataTable
    //for(var i=0; i<studentData.length; i++){
    //  data.addRow([studentData[i].studentId, studentData[i].Result]);
    //}

    // Set chart options
    var options = {
      histogram: {bucketSize: 0.5, minValue: 0, maxValue: 4, hideBucketItems:true,},
      hAxis: {ticks: [0, 1.5, 2, 2.5, 3, 3.5, 4]},
      legend:{ position: 'none' },
      width:365,
      height:400,
      colors:['#141ba2'],
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Histogram(document.getElementById('chart5'));
    chart.draw(data, options);
  }

}