import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google:any;

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart1);
    google.charts.setOnLoadCallback(this.drawChart2);
    google.charts.setOnLoadCallback(this.drawChart3);
    google.charts.setOnLoadCallback(this.drawChart4);
  }

  drawChart1(){
    // Create the data table.
    var data = google.visualization.arrayToDataTable([
      ['Satisfaction', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent', { role: 'annotation' } ],
      ['Is the content clear?', 30, 0, 0, 0, 70, ''],
      ['Is the content repeated?', 15, 0, 0, 0, 20, ''],
      ['How effectively did the course content prepare you for future courses or careers?', 5, 15, 20, 50, 10, ''], 
      ['How relevant was the course content to the course objectives?', 2, 8, 10, 55, 25, ''],
      ['To what extent was the content of the course good?', 15, 22, 20, 23, 20, ''],
    ]);

    // Set chart options
    var options = {isStacked: 'percent',
    'legend':{position: 'top', textStyle: {fontSize: 12}},
    'width':700,
    'height':500,
    colors:['#D32F2F','#F57C00','#FFEB3B','#8BC34A','#388E3C'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('c_chart'));
    chart.draw(data, options);
  }

  drawChart2(){
    // Create the data table.
    var data = google.visualization.arrayToDataTable([
      ['Satisfaction', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent', { role: 'annotation' } ],
      ['How well did the professor engage students during class?', 14, 85, 22, 145, 70, ''],
      ['How effectively did the professor convey the material covered in the course?', 12, 10, 14, 24, 30, ''],
      ['Were the course expectations and grading criteria clearly communicated?', 15, 0, 0, 0, 89, ''], 
      ['How would you rate the professor\'s overall effectiveness as a teacher?', 15, 15, 2, 124, 89, ''],
      ['How would you rate the professor\'s communication skills?', 15, 22, 20, 75, 45, ''],
    ]);

    // Set chart options
    var options = {isStacked: 'percent',
    'legend':{position: 'top', textStyle: {fontSize: 12}},
    'width':700,
    'height':500,
    colors:['#D32F2F','#F57C00','#FFEB3B','#8BC34A','#388E3C'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('p_chart'));
    chart.draw(data, options);
  }

  drawChart3(){
    // Create the data table.
    var data = google.visualization.arrayToDataTable([
      ['Satisfaction', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent', { role: 'annotation' } ],
      ['How well did the professor engage students during class?', 125, 74, 22, 40, 14, ''],
      ['How effectively did the professor convey the material covered in the course?', 144, 87, 12, 10, 6, ''],
      ['Were the course expectations and grading criteria clearly communicated?', 15, 0, 0, 0, 89, ''], 
      ['How would you rate the professor\'s overall effectiveness as a teacher?', 182, 12, 2, 47, 2, ''],
      ['How would you rate the professor\'s communication skills?', 160, 75, 12, 45, 10, ''],
    ]);

    // Set chart options
    var options = {isStacked: 'percent',
    'legend':{position: 'top', textStyle: {fontSize: 12}},
    'width':700,
    'height':500,
    colors:['#D32F2F','#F57C00','#FFEB3B','#8BC34A','#388E3C'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('ta1_chart'));
    chart.draw(data, options);
  }

  drawChart4(){
    // Create the data table.
    var data = google.visualization.arrayToDataTable([
      ['Satisfaction', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent', { role: 'annotation' } ],
      ['How well did the professor engage students during class?', 14, 85, 22, 145, 70, ''],
      ['How effectively did the professor convey the material covered in the course?', 12, 10, 14, 24, 30, ''],
      ['Were the course expectations and grading criteria clearly communicated?', 10, 0, 0, 0, 70, ''], 
      ['How would you rate the professor\'s overall effectiveness as a teacher?', 15, 15, 2, 124, 89, ''],
      ['How would you rate the professor\'s communication skills?', 15, 22, 20, 75, 45, ''],
    ]);

    // Set chart options
    var options = {isStacked: 'percent',
    'legend':{position: 'top', textStyle: {fontSize: 12}},
    'width':700,
    'height':500,
    colors:['#D32F2F','#F57C00','#FFEB3B','#8BC34A','#388E3C'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('ta2_chart'));
    chart.draw(data, options);
  }

}
