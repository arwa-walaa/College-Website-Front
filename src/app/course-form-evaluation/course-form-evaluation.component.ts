// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-course-form-evaluation',
  templateUrl: './course-form-evaluation.component.html',
  styleUrls: ['./course-form-evaluation.component.css']
})
export class CourseFormEvaluationComponent implements OnInit {

  @ViewChild('form') form: any;
  currentPage = 1;
  firstPageSubmitted: boolean = false;
  secondPageSubmitted: boolean = false;
  thirdPageSubmitted: boolean = false;
  finalPageSubmitted: boolean = false;
  seconedProfessorPageSubmitted: boolean = false;
  

  studId:any;
  courseName: any;
  courseID: any;
  professorsToEvaluate: any;
  TAData:any;

  options = [
    { value: "1", label: 'Very Poor' },
    
    { value: "2", label: 'Poor' },
    
    { value: "3", label: 'Average' },
    
    { value: "4", label: 'Good' },
    
    { value: "5", label: 'Excellent' } 
  ];

  course = [
    { name: "isClear", question: 'To what extent the content is clear?', value: null },
    
    { name: "isRepeated", question: 'To what extent the content is not repeated?' , value: null},
    
    { name: "preparetionForFutureCourses", question: 'How effectively did the course content' ,value: null},
    
    { name: "relevantToObjectives", question: 'How relevant was the course content to the course objectives?',value:null },
    
    { name: "contentRate", question: 'To what extent was the content of the course good?',value: null } 
  ];

  professor = [
    { name: "engagedStudents", question: 'How well did the professor engage students during class?',value: null },
    
    { name: "teacherEffectiveness", question: "How would you rate the professor\'s overall effectiveness as a teacher?" ,value: null},
    
    { name: "communicationSkills", question: 'How would you rate the professor\'s communication skills?',value: null },
    
    { name: "isClearAgenda", question: 'Were the course expectations and grading criteria clearly communicated?',value: null },
    
    { name: "conveiedMaterial", question: 'How effectively did the professor convey the material covered in the course?',value: null } 
  ];

  
  professor2 = [
    { name: "engagedStudents", question: 'How well did the professor engage students during class?',value: null },
    
    { name: "teacherEffectiveness", question: "How would you rate the professor\'s overall effectiveness as a teacher?" ,value: null},
    
    { name: "communicationSkills", question: 'How would you rate the professor\'s communication skills?',value: null },
    
    { name: "isClearAgenda", question: 'Were the course expectations and grading criteria clearly communicated?',value: null },
    
    { name: "conveiedMaterial", question: 'How effectively did the professor convey the material covered in the course?',value: null } 
  ];

  ta = [
    { name: "TAengagedStudents", question: 'How well did the ta engage students during class?',value: null },
    
    { name: "TAteacherEffectiveness", question: "How would you rate the ta\'s overall effectiveness as a teacher?",value: null },
    
    { name: "TAcommunicationSkills", question: 'How would you rate the ta\'s communication skills?',value: null },
    
    { name: "TAisClearAgenda", question: 'Were the course expectations and grading criteria clearly communicated?',value: null },
    
    { name: "TAconveiedMaterial", question: 'How effectively did the ta convey the material covered in the course?' ,value: null} 
  ];

  constructor(private _AuthService:AuthService,private route: ActivatedRoute, private router: Router, private __StudentsService: StudentsService, private http: HttpClient) { }
  ngOnInit(): void {
    const token=this._AuthService.getToken();
    this.__StudentsService.getStudentInfo(token).subscribe({
      next: (StudData:any) => {
        this.studId=StudData[0].studentId
        console.log('studId:',this.studId); 
        ///////////////////////////////
        this.__StudentsService.getProfessorDetailsToEvaluate(this.studId,this.courseID).subscribe({
          next: (response: any) => {
            this.professorsToEvaluate = response;
            console.log('professorsToEvaluate: ',this.professorsToEvaluate);
          
          },
          error: (error) => {
            console.error('Error getting course details:', error);
          }
        });
    
        this.__StudentsService.getTADetailsToEvaluate(this.studId,this.courseID).subscribe({
          next: (response: any) => {
            this.TAData = response;
            console.log('TAData:',this.TAData); 
          },
          error: (error) => {
            console.error('Error getting course details:', error);
          }
        });
        /////////////////////////////
      },
      error: (error) => {
        console.error('Error getting studId:', error);
      }
    });

    this.route.queryParams.subscribe(params => {
      const test = params['courseName'];
      const test2 = params['courseID'];
      this.courseName = test;
      this.courseID = test2;
      console.log('Course Name:', test);
      console.log('Course ID:', test2);
    });

  }

  onSubmit() {
    const formData = new FormData();

    if (this.currentPage === 1) {
      let unfilledOptions = [];
      for (let i = 0; i < this.course.length; i++) {
        console.log('course array',this.course[i].value);
        if (this.course[i].value != null && this.courseID != null)
        {
        }
        else
        {
          unfilledOptions.push(this.course[i].question);
        }
      }

      if (unfilledOptions.length === 0) {
        this.firstPageSubmitted = true;
        this.currentPage = 2;
      }

      else {
        alert("Please, fill all fields");
      }

     }


    else if (this.currentPage === 2) {
      let unfilledOptions = [];
      for (let i = 0; i < this.professor.length; i++) {
        console.log('course array',this.professor[i].value);
        if (this.professor[i].value != null)
        {}
        else
        {
          unfilledOptions.push(this.professor[i].question);
        }
      }

      if(unfilledOptions.length === 0 && this.professorsToEvaluate[0].professorName2 != null)
      {
        this.secondPageSubmitted = true;
        this.currentPage = 3;
        this.seconedProfessorPageSubmitted=true;
        
      }
      else if(unfilledOptions.length === 0 && this.professorsToEvaluate[0].professorName2 == null)
      {
        this.secondPageSubmitted = true;
        this.currentPage = 4;
      }
      else {
        alert("Please, fill all fields");
      }
    }
    else if (this.currentPage === 3 && this.professorsToEvaluate[0].professorName2 !=null ) {
      let unfilledOptions = [];
      
      for (let i = 0; i < this.professor2.length; i++) {
        console.log('course array',this.professor2[i].value);
        if (this.professor2[i].value != null)
        {}
        else
        {
          unfilledOptions.push(this.professor2[i].question);
        }
      }

      if(unfilledOptions.length === 0)
      {
        this.thirdPageSubmitted = true;
        this.currentPage = 4;
      }

      else {
        alert("Please, fill all fields");
      }
    }

    else  {
      let unfilledOptions = [];
      for (let i = 0; i < this.ta.length; i++) {
        console.log('ta array',this.ta[i].value);
        if (this.ta[i].value != null)
        {}
        else
        {
          unfilledOptions.push(this.ta[i].question);
        }
      }

      if(unfilledOptions.length === 0)
      {
        // All evaluations submitted, insert data into database
        this.finalPageSubmitted = true;
        let professor1Evaluation = {
          "course evaluation": this.course,
          "professor evaluation": this.professor,
          "ta evaluation": this.ta,
          "course id": this.courseID,
          "professor id": this.professorsToEvaluate[0].professorID1,
          "ta id": this.TAData[0].TAId,
          "student id":this.studId
        };
        let professor2Evaluation = {
          "course evaluation": this.course,
          "professor evaluation": this.professor2,
          "ta evaluation": this.ta,
          "course id": this.courseID,
          "professor id": this.professorsToEvaluate[0].professorID2,
          "ta id": this.TAData[0].TAId,
          "student id":this.studId
        };
        if (this.professorsToEvaluate[0].professorName2 != null) {
          // Two professors evaluated, insert two separate records
          fetch('http://127.0.0.1:8000/api/courseEvaluation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(professor1Evaluation)
          })
          .then(response => {
            console.log('data has been inserted successfully for professor 1');
          })
          .catch(error => {
            console.error('error');
          });
          fetch('http://127.0.0.1:8000/api/courseEvaluation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(professor2Evaluation)
          })
          .then(response => {
            console.log('data has been inserted successfully for professor 2');
          })
          .catch(error => {
            console.error('error');
          });
        } else {
          // Only one professor evaluated, insert one record
          fetch('http://127.0.0.1:8000/api/courseEvaluation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(professor1Evaluation)})
          .then(response => {
            console.log('data has been inserted successfully');
          })
          .catch(error => {
            console.error('error');
          });
        }
        alert("Form has been submitted successfully");
        this.router.navigate(['/CourseEvaluation']);
      }

      else {
        alert("Please, fill all fields");
      }
    }
    
  }
  goToPreviousPage() {
    this.currentPage -= 1;
  }
  navigateToregisterdCoursesAndResults(){
    this.router.navigate(['registerdCoursesAndResults']);
  }
  navigateToHome(){
    this.router.navigate(['home_login']); 
  }
  navigateToEvaluateCourses(){
    this.router.navigate(['CourseEvaluation']);
  }
}