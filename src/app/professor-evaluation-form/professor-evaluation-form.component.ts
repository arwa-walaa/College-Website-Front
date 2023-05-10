import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-evaluation-form',
  templateUrl: './professor-evaluation-form.component.html',
  styleUrls: ['./professor-evaluation-form.component.css']
})
export class ProfessorEvaluationFormComponent {
  constructor(private router: Router) {}
  
  questions = [
    {
      id: 1,
      question: 'How well did the professor engage students during class?',
      options: [
        { id: 1, value: 'Very Poor' },
        { id: 2, value: 'Poor' },
        { id: 3, value: 'Average' },
        { id: 4, value: 'Good' },
        { id: 5, value: 'Excellent' }
        
      ]
    },
    {
      id: 2,
      question: 'How effectively did the professor convey the material covered in the course?',
      options: [
        { id: 1, value: 'Very Poor' },
        { id: 2, value: 'Poor' },
        { id: 3, value: 'Average' },
        { id: 4, value: 'Good' },
        { id: 5, value: 'Excellent' }
        
      ]
    },
    {

      id: 3,
      question: 'Were the course expectations and grading criteria clearly communicated?',
      options: [
        { id: 1, value: 'Yes' },
        { id: 2, value: 'No' },
      ]
    },
    {
      id: 4,
      question: 'How would you rate the professor\'s overall effectiveness as a teacher?',
      options: [
        { id: 1, value: 'Very Poor' },
        { id: 2, value: 'Poor' },
        { id: 3, value: 'Average' },
        { id: 4, value: 'Good' },
        { id: 5, value: 'Excellent' }
        
      ]
    },
    {
    id: 5,
      question: 'How would you rate the professor\'s communication skills?',
      options: [
        { id: 1, value: 'Very Poor' },
        { id: 2, value: 'Poor' },
        { id: 3, value: 'Average' },
        { id: 4, value: 'Good' },
        { id: 5, value: 'Excellent' }
      ]
    },
    
  ];
  navigateToTaFormEvaluation() {
    this.router.navigate(['TaFormEvaluation']);
  }
}
