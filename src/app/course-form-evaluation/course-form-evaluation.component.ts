// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-form-evaluation',
  templateUrl: './course-form-evaluation.component.html',
  styleUrls: ['./course-form-evaluation.component.css']
})
export class CourseFormEvaluationComponent implements OnInit{
 
  @ViewChild('form') form: any;
  currentPage=1;
  firstPageSubmitted:boolean=false;
  secondPageSubmitted:boolean=false;
  finalPageSubmitted:boolean=false;
  
  courseName: any;
   
  contentRate:  any;
  isRepeated: any;
  isClear: any;
  relevantToObjectives: any;
  preparetionForFutureCourses: any;
  courseID:any;

  engagedStudents:any;
  conveiedMaterial:any;
  isClearAgenda:any;
  teacherEffectiveness:any;
  communicationSkills:any;
  professorId:any;

  TAengagedStudents:any;
  TAconveiedMaterial:any;
  TAisClearAgenda:any;
  TAteacherEffectiveness:any;
  TAcommunicationSkills:any;
  TAId:any;

  CID:any;


  //courseID:any;
  tableData:any;

  isValid:any;
  
  //courseId:any;
  constructor(private route: ActivatedRoute,private router: Router,private __StudentsService:StudentsService,private http: HttpClient) {}
  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      const test = params['courseName'];
      const test2 = params['courseID'];
      this.courseName=test;
      this.courseID = test2;
      console.log('Course Name:',test);
      console.log('Course ID:',test2);
    });
  
    this.__StudentsService.getCourseDetails(this.courseID).subscribe({
      next: (response) => {
        this.tableData = response;
        //this.courseID = response;
        console.log(this.tableData); // Move the console.log statement inside the subscribe block
        // Code that uses the tableData variable goes here
      },
      error: (error) => {
        console.error('Error getting course details:', error);
      }
    });


    this.__StudentsService.getProfessorID(this.courseID).subscribe({
      next: (response:any) => {
        this.professorId = response;
        console.log(this.professorId); // Move the console.log statement inside the subscribe block
        // Code that uses the tableData variable goes here
      },
      error: (error) => {
        console.error('Error getting course details:', error);
      }
    });

    this.__StudentsService.getTAID(this.courseID).subscribe({
      next: (response:any) => {
        this.TAId = response;
        console.log(this.TAId); // Move the console.log statement inside the subscribe block
        // Code that uses the tableData variable goes here
      },
      error: (error) => {
        console.error('Error getting course details:', error);
      }
    });
    
  }

  onSubmit() {
    // Submit current page
    if (this.currentPage === 1) {
       if(this.isClear != null && this.isRepeated  != null && this.preparetionForFutureCourses  != null&&
        this.relevantToObjectives  != null && this.contentRate  != null && 
        this.courseID  != null)
      {
        this.firstPageSubmitted = true;
        this.currentPage = 2;
      }   
      else{
        alert("Please, fill all fields");
      }  
    } 

    else if (this.currentPage === 2) {
      if(this.engagedStudents != null && this.conveiedMaterial != null && this.isClearAgenda != null && 
        this.teacherEffectiveness != null&& this.communicationSkills != null && 
        this.professorId != null)
      {
        this.secondPageSubmitted = true;
        this.currentPage = 3;
      }
      else{
        alert("Please, fill all fields");
      } 
      
    } else {
      if(this.TAengagedStudents != null && this.TAconveiedMaterial != null && this.TAisClearAgenda != null && 
       this.TAteacherEffectiveness != null && this.TAcommunicationSkills != null && 
       this.TAId != null)
      {
        // Submit final page
      this.finalPageSubmitted = true;
      
      // Make API request to insert form data into database
      const formData = {
        isClear: this.isClear,
        isRepeated: this.isRepeated,
        preparetionForFutureCourses: this.preparetionForFutureCourses,
        relevantToObjectives: this.relevantToObjectives,
        contentRate: this.contentRate,
        /////cont
        // courseID: this.courseID[0].courseID,
        courseID: this.courseID,
        //courseID: "1",

        engagedStudents:this.engagedStudents,
        conveiedMaterial:this.conveiedMaterial,
        isClearAgenda:this.isClearAgenda,
        teacherEffectiveness:this.teacherEffectiveness,
        communicationSkills:this.communicationSkills,
        professorId:this.professorId[0].professorId,
        //professorId: "1",

        TAengagedStudents:this.TAengagedStudents,
        TAconveiedMaterial:this.TAconveiedMaterial,
        TAisClearAgenda:this.TAisClearAgenda,
        TAteacherEffectiveness:this.TAteacherEffectiveness,
        TAcommunicationSkills:this.TAcommunicationSkills,
        //TAId: "1"
        TAId:this.TAId[0].TAId  
      };
      // if(this.isClear && this.isRepeated && this.preparetionForFutureCourses &&
      //   this.relevantToObjectives && this.contentRate &&
      //   this.courseID &&
      
      //   this.engagedStudents && this.conveiedMaterial && this.isClearAgenda && 
      //   this.teacherEffectiveness && this.communicationSkills && 
      //   this.professorId && 
        
      //   this.TAengagedStudents && this.TAconveiedMaterial && this.TAisClearAgenda && 
      //   this.TAteacherEffectiveness && this.TAcommunicationSkills && 
      //   this.TAId)

        // {  this.isValid = true;}
      //   if(1)
      // {

      if(formData==null)
      {
        this.isValid = false;
      }
    
      
      this.http.post('http://127.0.0.1:8000/api/courseEvaluation', formData).subscribe(
        response => {
          console.log('Form data inserted successfully!');
        
        
        },
        error => {
          console.error('Form data inserted successfully!', error);
          alert('The form has been submitted successfully');
          this.router.navigate(['/CourseEvaluation']);
          
        }
      );
      //}
      // else{
      //   this.isValid = false;
      //   alert('Please, fill all form fields');
      // }
      }

      else{
        alert("Please, fill all fields");
      } 
     
    }
  }
  }


