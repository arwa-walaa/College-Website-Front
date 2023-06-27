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
  courseValid:boolean = false;
  currentPage = 1;
  counter = 0;
  firstPageSubmitted: boolean = false;
  secondPageSubmitted: boolean = false;
  finalPageSubmitted: boolean = false;

  courseName: any;

  contentRate: any;
  isRepeated: any;
  isClear: any;
  relevantToObjectives: any;
  preparetionForFutureCourses: any;
  courseID: any;

  engagedStudents: any;
  conveiedMaterial: any;
  isClearAgenda: any;
  teacherEffectiveness: any;
  communicationSkills: any;
  TAengagedStudents: any;
  TAconveiedMaterial: any;
  TAisClearAgenda: any;
  TAteacherEffectiveness: any;
  TAcommunicationSkills: any;
  TAId: any;
  tableData: any;
  isValid: any;
  studId:any;
  professorIds: any;
  professorObjects: any = [];
  ///////////////////////

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
    this.__StudentsService.getStudentInfo(token).subscribe((StudData:any ) => {
      this.studId=StudData[0].studentId
    });

    this.route.queryParams.subscribe(params => {
      const test = params['courseName'];
      const test2 = params['courseID'];
      this.courseName = test;
      this.courseID = test2;
      console.log('Course Name:', test);
      console.log('Course ID:', test2);
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


    this.__StudentsService.getProfessorID(this.studId,this.courseID).subscribe({
      next: (response: any) => {
        this.professorIds = response;
        console.log('prof idssssssssss',this.professorIds);
        this.professorObjects = [];

        for (const professor of this.professorIds) {
          for (const key in professor) {
            if (key.startsWith('professorID')) {
              const index = key.replace('professorID', '');
              const professorName = professor[`professorName${index}`];
              if (this.professorIds[0].professorName2 != null) {
                this.professorObjects.push({
                  professorId: professor[key],
                  professorName: professorName
                });
              }
            }
          }
        }
        console.log('prof ids',this.professorObjects); // Move the console.log statement inside the subscribe block
        // Code that uses the tableData variable goes here
      },
      error: (error) => {
        console.error('Error getting course details:', error);
      }
    });

    this.__StudentsService.getTAID(this.courseID).subscribe({
      next: (response: any) => {
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

      if(unfilledOptions.length === 0)
      {
        this.secondPageSubmitted = true;
        this.currentPage = 3;
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
        this.finalPageSubmitted = true;
       
        const courseJSON = JSON.stringify(this.course);
        formData.append('course id', this.courseID);
        formData.append('course evaluation', courseJSON);
        

        const professorJSON = JSON.stringify(this.professor);
        // formData.append('profeesor id', this.professorIds[0].professorId1);
        formData.append('professor id', 'ihelal');
        formData.append('professor evaluation', professorJSON);

        const taJSON = JSON.stringify(this.ta);
        // formData.append('ta id', this.TAId[0].TAId);
        formData.append('ta id', 'damr');
        formData.append('ta evaluation', taJSON);

        for (let entry of (<any>formData).entries()) {
          console.log(entry[0] + ': ' + entry[1]);
        }

        // this.http.post('http://127.0.0.1:8000/api/courseEvaluation', formData).subscribe(
        //   response => {
        //     console.log('Form data inserted successfully!');
        //   },
        //   error => {
        //     console.error('Form data inserted successfully!', error);
        //     // alert('The form has been submitted successfully');
        //     // this.router.navigate(['/CourseEvaluation']);

        //   }
        // );

        const requestBody = {
          "course evaluation": this.course,
          "professor evaluation": this.professor,
          "ta evaluation": this.ta,
          "course id": this.courseID,
          "professor id": 'ihelal',
          "ta id": 'damr',
        };
        
        fetch('http://127.0.0.1:8000/api/courseEvaluation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        .then(response => {
          console.log('data has been inserted successfully');
        })
        .catch(error => {
          console.error('error');
        });
      }

      else {
        alert("Please, fill all fields");
      }
    }
    
  }
  goToPreviousPage() {
    this.currentPage -= 1;
  }
}