import { Component } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-statistics-department',
  templateUrl: './statistics-department.component.html',
  styleUrls: ['./statistics-department.component.css']
})
export class StatisticsDepartmentComponent {
  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawPieChart);
    google.charts.setOnLoadCallback(this.drawHistogramCS);
    google.charts.setOnLoadCallback(this.drawHistogramIS);
    google.charts.setOnLoadCallback(this.drawHistogramIT);
    google.charts.setOnLoadCallback(this.drawHistogramDS);
    google.charts.setOnLoadCallback(this.drawHistogramAI);
  }

  
  drawPieChart(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Department');
    data.addColumn('number', 'Number of Students');
    data.addRows([
      ['CS', 291],
      ['IS', 260],
      ['IT', 143], 
      ['DS', 126],
      ['AI', 178]
    ]);

    // Set chart options
    var options = {
      legend:'top',
      width:370,
      height:370,
      colors:['#3E8DE3','#04060D','#C70039','#143AA2','#BFC6D6'],
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(data, options);
  }

  drawHistogramCS(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Stident');;
    data.addColumn('number', 'GPA');
    
    data.addRows([
      ['20190078', 2.3],
      ['20190475', 3.6],
      ['20190143', 1.4], 
      ['20190186', 2.9],
      ['20190028', 3.3],
      ['20190475', 3.8],
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
    var chart = new google.visualization.Histogram(document.getElementById('chart1'));
    chart.draw(data, options);
  }

  drawHistogramIS(){
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
    var chart = new google.visualization.Histogram(document.getElementById('chart2'));
    chart.draw(data, options);
  }

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
