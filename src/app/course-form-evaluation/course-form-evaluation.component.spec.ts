import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormEvaluationComponent } from './course-form-evaluation.component';

describe('CourseFormEvaluationComponent', () => {
  let component: CourseFormEvaluationComponent;
  let fixture: ComponentFixture<CourseFormEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseFormEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFormEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
