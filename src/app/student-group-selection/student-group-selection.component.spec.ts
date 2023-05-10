import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupSelectionComponent } from './student-group-selection.component';

describe('StudentGroupSelectionComponent', () => {
  let component: StudentGroupSelectionComponent;
  let fixture: ComponentFixture<StudentGroupSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGroupSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGroupSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
