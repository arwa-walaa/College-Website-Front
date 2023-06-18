import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google:any;

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawPieChart);
    google.charts.setOnLoadCallback(this.drawHistogram);
  }

  drawPieChart(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Success');
    data.addColumn('number', 'Number of Students');
    data.addRows([
      ['Succeeded', 140],
      ['Failed', 50]
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
    chart.draw(data, options);
  }

  // drawPieChart(numStudentsPassed: any , numStudentsFailed: any){
    
  //   // Create the data table.
  //   console.log('passed',numStudentsPassed);
  //   console.log('failed',numStudentsFailed);
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'Success');
  //   data.addColumn('number', 'Number of Students');
  //   data.addRows([
  //     ['Succeeded',numStudentsPassed ],
  //     ['Failed',numStudentsFailed]
  //   ]);

  //   // Set chart options
  //   var options = {pieHole: 0.4,
  //   'legend':'bottom',
  //   'width':375,
  //   'height':400,
  //   colors:['#3E8DE3', '#141ba2'],
  //   };

  //   // Instantiate and draw our chart, passing in some options.
  //   var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
  //   // chart.draw(data, options);
  //   try {
  //     chart.draw(data, options);
  //   } catch (error) {
  //     console.error('Error drawing chart: ', error);
  //   }
  // }

  drawHistogram(){
    var data = new google.visualization.DataTable();
      data.addColumn('string', 'Student');
      data.addColumn('number', 'Grade');
      data.addRows([
        ['20190100', 85],
        ['20190101', 94],
        ['20190102', 40],
        ['20190103', 55],
        ['20190104', 74],
        ['20190105', 71],
        ['20190106', 82],
        ['20190107', 34],
        ['20190108', 90],
        ['20190109', 98],
        ['20190110', 84],
        ['20190111', 62],
        ['20190112', 59],
        ['20190113', 78],
        ['20190114', 69],
        ['20190115', 77],
        ['20190116', 83],
        ['20190117', 88],
        ['20190118', 62],
        ['20190119', 82],
        ['20190120', 73],
      ]);

    // Set chart options
    var options = {histogram: {bucketSize: 10, minValue: 0, maxValue: 100, hideBucketItems:true},
      'legend':{ position: 'none' },
      'width':480,
      'height':400,
      colors:['#141ba2'],
      };

      var chart = new google.visualization.Histogram(document.getElementById('histogram'));
      chart.draw(data, options);
  }


  
  navigateToAddGrades() {
    this.router.navigate(['']);
  }
  navigateToSeeFeedbacks() {
    this.router.navigate(['view_feedbacks'], { queryParams: { courseName: this.courseName, courseID: this.courseID} });
  }
  navigateToViewStudents() {
    this.router.navigate(['']);
  }
}
