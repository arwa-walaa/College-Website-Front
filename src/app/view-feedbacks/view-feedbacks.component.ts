//   drawChart4(){
//     // Create the data table.
//     var data = google.visualization.arrayToDataTable([
//       ['Satisfaction', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent', { role: 'annotation' } ],
//       ['How well did the professor engage students during class?', 14, 85, 22, 145, 70, ''],
//       ['How effectively did the professor convey the material covered in the course?', 12, 10, 14, 24, 30, ''],
//       ['Were the course expectations and grading criteria clearly communicated?', 10, 0, 0, 0, 70, ''], 
//       ['How would you rate the professor\'s overall effectiveness as a teacher?', 15, 15, 2, 124, 89, ''],
//       ['How would you rate the professor\'s communication skills?', 15, 22, 20, 75, 45, ''],
//     ]);

//     // Set chart options
//     var options = {isStacked: 'percent',
//     'legend':{position: 'top', textStyle: {fontSize: 12}},
//     'width':700,
//     'height':500,
//     colors:['#D32F2F','#F57C00','#FFEB3B','#8BC34A','#388E3C'],
//     };

//     // Instantiate and draw our chart, passing in some options.
//     var chart = new google.visualization.BarChart(document.getElementById('ta2_chart'));
//     chart.draw(data, options);
//   }

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { AuthService } from '../auth.service';
declare var google:any;

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any;
  courseName: any;
  professorId:any;
  TAId:any;
  userTypeValue: any;

  constructor(private http: HttpClient, private stdService:StudentsService,
    private route: ActivatedRoute,private router: Router,
    private profAndTa: ProfessorAndTaService,
    private _AuthService: AuthService) {}

 
  ngOnInit(): void {
    const token = this._AuthService.getToken();
    //////////////////////

    this._AuthService.getType(token).subscribe((userType: any) => {
      if (userType && userType.length > 0) {
        this.userTypeValue = userType[0].Type;
        console.log("usertype", this.userTypeValue);

       if (this.userTypeValue === "Professor") {
          this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData: any) => {
            if (ProfessorData && ProfessorData.length > 0) {
              this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData: any) => {
                this.professorId = ProfessorData[0].professorId;
                console.log('prof id', this.professorId);
        
                this.route.queryParams.subscribe(params => {
                    this.courseName = params['courseName'];
                    console.log('courseName', this.courseName);
        
                    this.stdService.getFeedbacks(this.courseName, this.professorId).subscribe((data: any) => {
                        this.feedbacks = data;
        
                        // Call the chart drawing functions here using the feedbacks data
                        google.charts.load('current', { packages: ['corechart'] });
                        google.charts.setOnLoadCallback(() => this.drawChart1(this.feedbacks));
                        google.charts.setOnLoadCallback(() => this.drawChart2(this.feedbacks));
                        google.charts.setOnLoadCallback(() => this.drawChart3(this.feedbacks));
                        // google.charts.setOnLoadCallback(() => this.drawChart4(this.feedbacks));
                        console.log('feedbacks', this.feedbacks);
                        console.log('courseName', this.courseName);
                        console.log('prof id', this.professorId);
                    });
                });
            });
              
            } else {
              console.error("professor data is empty or null");
            }
          });
        }
        else if (this.userTypeValue === "TA") {
          this.profAndTa.getTAInfo(token).subscribe((TAData: any) => {
            if (TAData && TAData.length > 0) {
              this.profAndTa.getTAInfo(token).subscribe((TAData: any) => {
                this.TAId = TAData[0].TAId;
                console.log('TA id', this.TAId);
        
                this.route.queryParams.subscribe(params => {
                    this.courseName = params['courseName'];
                    console.log('courseName', this.courseName);
        
                    this.stdService.getFeedbacks(this.courseName, this.TAId).subscribe((data: any) => {
                        this.feedbacks = data;
        
                        // Call the chart drawing functions here using the feedbacks data
                        google.charts.load('current', { packages: ['corechart'] });
                        google.charts.setOnLoadCallback(() => this.drawChart1(this.feedbacks));
                        google.charts.setOnLoadCallback(() => this.drawChart3(this.feedbacks));
                        // google.charts.setOnLoadCallback(() => this.drawChart4(this.feedbacks));
                        console.log('feedbacks', this.feedbacks);
                        console.log('courseName', this.courseName);
                        console.log('prof id', this.professorId);
                    });
                });
            });
            } else {
              console.error("TA data is empty or null");
            }
          });
        }
        else {
          console.error("Unknown userType: " + this.userTypeValue);
        }
      } else {
        console.error("userType is empty or null");
      }
      
    });







    ////////////////
    this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData: any) => {
        this.professorId = ProfessorData[0].professorId;
        console.log('prof id', this.professorId);

        this.route.queryParams.subscribe(params => {
            this.courseName = params['courseName'];
            console.log('courseName', this.courseName);

            this.stdService.getFeedbacks(this.courseName, this.professorId).subscribe((data: any) => {
                this.feedbacks = data;

                // Call the chart drawing functions here using the feedbacks data
                google.charts.load('current', { packages: ['corechart'] });
                google.charts.setOnLoadCallback(() => this.drawChart1(this.feedbacks));
                google.charts.setOnLoadCallback(() => this.drawChart2(this.feedbacks));
                google.charts.setOnLoadCallback(() => this.drawChart3(this.feedbacks));
                // google.charts.setOnLoadCallback(() => this.drawChart4(this.feedbacks));
                console.log('feedbacks', this.feedbacks);
                console.log('courseName', this.courseName);
                console.log('prof id', this.professorId);
            });
        });
    });
}


drawChart1(feedbacks: any[]) {
  // Create an object to hold the chart data
  const chartData: {[key: string]: number[]} = {
    'Is the content clear?': [0, 0, 0, 0, 0],
    'Is the content repeated?': [0, 0, 0, 0, 0],
    'How effectively did the course content prepare you for future courses or careers?': [0, 0, 0, 0, 0],
    'How relevant was the course content to the course objectives?': [0, 0, 0, 0, 0],
    'To what extent was the content of the course good?': [0, 0, 0, 0, 0],
  };

  // Loop through the feedback data and update the chart data
  feedbacks.forEach((feedback) => {
    chartData['Is the content clear?'][feedback.isClear - 1]++;
    chartData['Is the content repeated?'][feedback.isRepeated - 1]++;
    chartData['How effectively did the course content prepare you for future courses or careers?'][feedback.preparetionForFutureCourses - 1]++;
    chartData['How relevant was the course content to the course objectives?'][feedback.relevantToObjectives- 1]++;
    chartData['To what extent was the content of the course good?'][feedback.contentRate - 1]++;
  });

  // Convert the chart data object to an array of arrays
  const data = [
    ['Question', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
    [
      'Is the content clear?',
      chartData['Is the content clear?'][0],
      chartData['Is the content clear?'][1],
      chartData['Is the content clear?'][2],
      chartData['Is the content clear?'][3],
      chartData['Is the content clear?'][4],
    ],
    [
      'Is the content repeated',
      chartData['Is the content repeated?'][0],
      chartData['Is the content repeated?'][1],
      chartData['Is the content repeated?'][2],
      chartData['Is the content repeated?'][3],
      chartData['Is the content repeated?'][4],
    ],
    [
      'How effectively did the course content prepare you for future courses or careers?',
      chartData['How effectively did the course content prepare you for future courses or careers?'][0],
      chartData['How effectively did the course content prepare you for future courses or careers?'][1],
      chartData['How effectively did the course content prepare you for future courses or careers?'][2],
      chartData['How effectively did the course content prepare you for future courses or careers?'][3],
      chartData['How effectively did the course content prepare you for future courses or careers?'][4],
    ],
    [
      'How relevant was the course content to the course objectives?',
      chartData['How relevant was the course content to the course objectives?'][0],
      chartData['How relevant was the course content to the course objectives?'][1],
      chartData['How relevant was the course content to the course objectives?'][2],
      chartData['How relevant was the course content to the course objectives?'][3],
      chartData['How relevant was the course content to the course objectives?'][4],
    ],
    [
      'To what extent was the content of the course good?',
      chartData['To what extent was the content of the course good?'][0],
      chartData['To what extent was the content of the course good?'][1],
      chartData['To what extent was the content of the course good?'][2],
      chartData['To what extent was the content of the course good?'][3],
      chartData['To what extent was the content of the course good?'][4],
    ],
  ];

  // Create the data table
  const chartDataTable = google.visualization.arrayToDataTable(data);

  // Set chart options
  const options = {
    isStacked: 'percent',
    legend: {position: 'top', textStyle: {fontSize: 12}},
    width: 700,
    height: 500,
   colors: ['#D32F2F', '#F57C00', '#FFEB3B', '#8BC34A', '#388E3C'],
  };

  // Instantiate and draw the chart
  const chart = new google.visualization.BarChart(document.getElementById('c_chart'));
  chart.draw(chartDataTable, options);
}

drawChart2(feedbacks: any[]) {
  // Create an object to hold the chart data
  const chartData2: {[key: string]: number[]} = {
    'How well did the professor engage students during class?': [0, 0, 0, 0, 0],
    'How effectively did the professor convey the material covered in the course?': [0, 0, 0, 0, 0],
    'Were the course expectations and grading criteria clearly communicated?': [0, 0, 0, 0, 0],
    'How would you rate the professor\'s overall effectiveness as a teacher?': [0, 0, 0, 0, 0],
    'How would you rate the professor\'s communication skills?': [0, 0, 0, 0, 0],
  };

  // Loop through the feedback data and update the chart data
  feedbacks.forEach((feedback) => {
    chartData2['How well did the professor engage students during class?'][feedback.engagedStudents - 1]++;
    chartData2['How effectively did the professor convey the material covered in the course?'][feedback.conveiedMaterial - 1]++;
    chartData2['Were the course expectations and grading criteria clearly communicated?'][feedback.isClearAgenda - 1]++;
    chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][feedback.teacherEffectiveness- 1]++;
    chartData2['How would you rate the professor\'s communication skills?'][feedback.communicationSkills - 1]++;
  });

  // Convert the chart data object to an array of arrays
  const data2 = [
    ['Question', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
    [
      'How well did the professor engage students during class?',
      chartData2[ 'How well did the professor engage students during class?'][0],
      chartData2[ 'How well did the professor engage students during class?'][1],
      chartData2[ 'How well did the professor engage students during class?'][2],
      chartData2[ 'How well did the professor engage students during class?'][3],
      chartData2[ 'How well did the professor engage students during class?'][4],
    ],
    [
      'How effectively did the professor convey the material covered in the course?',
      chartData2['How effectively did the professor convey the material covered in the course?'][0],
      chartData2['How effectively did the professor convey the material covered in the course?'][1],
      chartData2['How effectively did the professor convey the material covered in the course?'][2],
      chartData2['How effectively did the professor convey the material covered in the course?'][3],
      chartData2['How effectively did the professor convey the material covered in the course?'][4],
    ],
    [
      'Were the course expectations and grading criteria clearly communicated?',
      chartData2['Were the course expectations and grading criteria clearly communicated?'][0],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][1],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][2],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][3],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][4],
    ],
    [
      'How would you rate the professor\'s overall effectiveness as a teacher?',
      chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][0],
      chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][1],
      chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][2],
      chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][3],
      chartData2['How would you rate the professor\'s overall effectiveness as a teacher?'][4],
    ],
    [
      'How would you rate the professor\'s communication skills?',
      chartData2['How would you rate the professor\'s communication skills?'][0],
      chartData2['How would you rate the professor\'s communication skills?'][1],
      chartData2['How would you rate the professor\'s communication skills?'][2],
      chartData2['How would you rate the professor\'s communication skills?'][3],
      chartData2['How would you rate the professor\'s communication skills?'][4],
    ],
  ];

  // Create the data table
  const chartDataTable2 = google.visualization.arrayToDataTable(data2);

  // Set chart options
  const options = {
    isStacked: 'percent',
    legend: {position: 'top', textStyle: {fontSize: 12}},
    width: 700,
    height: 500,
   colors: ['#D32F2F', '#F57C00', '#FFEB3B', '#8BC34A', '#388E3C'],
  };

  // Instantiate and draw the chart
  const chart2 = new google.visualization.BarChart(document.getElementById('p_chart'));
  chart2.draw(chartDataTable2, options);
}

drawChart3(feedbacks: any[]) {
  // Create an object to hold the chart data
  const chartData2: {[key: string]: number[]} = {
    'How well did the ta engage students during class?': [0, 0, 0, 0, 0],
    'How effectively did the ta convey the material covered in the course?': [0, 0, 0, 0, 0],
    'Were the course expectations and grading criteria clearly communicated?': [0, 0, 0, 0, 0],
    'How would you rate the ta\'s overall effectiveness as a teacher?': [0, 0, 0, 0, 0],
    'How would you rate the ta\'s communication skills?': [0, 0, 0, 0, 0],
  };

  // Loop through the feedback data and update the chart data
  feedbacks.forEach((feedback) => {
    chartData2['How well did the ta engage students during class?'][feedback.engagedStudents - 1]++;
    chartData2['How effectively did the ta convey the material covered in the course?'][feedback.conveiedMaterial - 1]++;
    chartData2['Were the course expectations and grading criteria clearly communicated?'][feedback.isClearAgenda - 1]++;
    chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][feedback.teacherEffectiveness- 1]++;
    chartData2['How would you rate the ta\'s communication skills?'][feedback.communicationSkills - 1]++;
  });

  // Convert the chart data object to an array of arrays
  const data2 = [
    ['Question', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
    [
      'How well did the ta engage students during class?',
      chartData2[ 'How well did the ta engage students during class?'][0],
      chartData2[ 'How well did the ta engage students during class?'][1],
      chartData2[ 'How well did the ta engage students during class?'][2],
      chartData2[ 'How well did the ta engage students during class?'][3],
      chartData2[ 'How well did the ta engage students during class?'][4],
    ],
    [
      'How effectively did the ta convey the material covered in the course?',
      chartData2['How effectively did the ta convey the material covered in the course?'][0],
      chartData2['How effectively did the ta convey the material covered in the course?'][1],
      chartData2['How effectively did the ta convey the material covered in the course?'][2],
      chartData2['How effectively did the ta convey the material covered in the course?'][3],
      chartData2['How effectively did the ta convey the material covered in the course?'][4],
    ],
    [
      'Were the course expectations and grading criteria clearly communicated?',
      chartData2['Were the course expectations and grading criteria clearly communicated?'][0],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][1],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][2],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][3],
      chartData2['Were the course expectations and grading criteria clearly communicated?'][4],
    ],
    [
      'How would you rate the ta\'s overall effectiveness as a teacher?',
      chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][0],
      chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][1],
      chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][2],
      chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][3],
      chartData2['How would you rate the ta\'s overall effectiveness as a teacher?'][4],
    ],
    [
      'How would you rate the ta\'s communication skills?',
      chartData2['How would you rate the ta\'s communication skills?'][0],
      chartData2['How would you rate the ta\'s communication skills?'][1],
      chartData2['How would you rate the ta\'s communication skills?'][2],
      chartData2['How would you rate the ta\'s communication skills?'][3],
      chartData2['How would you rate the ta\'s communication skills?'][4],
    ],
  ];

  // Create the data table
  const chartDataTable2 = google.visualization.arrayToDataTable(data2);

  // Set chart options
  const options = {
    isStacked: 'percent',
    legend: {position: 'top', textStyle: {fontSize: 12}},
    width: 700,
    height: 500,
   colors: ['#D32F2F', '#F57C00', '#FFEB3B', '#8BC34A', '#388E3C'],
  };

  // Instantiate and draw the chart
  const chart2 = new google.visualization.BarChart(document.getElementById('ta1_chart'));
  chart2.draw(chartDataTable2, options);
}

  

  // Implement similar drawChart functions for the other charts using the feedbacks data
}
