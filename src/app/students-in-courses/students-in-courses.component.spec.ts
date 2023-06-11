import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInCoursesComponent } from './students-in-courses.component';

describe('StudentsInCoursesComponent', () => {
  let component: StudentsInCoursesComponent;
  let fixture: ComponentFixture<StudentsInCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsInCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsInCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
