import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEvaluationFormComponent } from './professor-evaluation-form.component';

describe('ProfessorEvaluationFormComponent', () => {
  let component: ProfessorEvaluationFormComponent;
  let fixture: ComponentFixture<ProfessorEvaluationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorEvaluationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
