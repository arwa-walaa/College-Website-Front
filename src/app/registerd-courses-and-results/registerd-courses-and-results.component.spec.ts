import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdCoursesAndResultsComponent } from './registerd-courses-and-results.component';

describe('RegisterdCoursesAndResultsComponent', () => {
  let component: RegisterdCoursesAndResultsComponent;
  let fixture: ComponentFixture<RegisterdCoursesAndResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterdCoursesAndResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterdCoursesAndResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
