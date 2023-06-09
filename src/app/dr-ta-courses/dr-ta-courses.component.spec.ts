import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrTaCoursesComponent } from './dr-ta-courses.component';

describe('DrTaCoursesComponent', () => {
  let component: DrTaCoursesComponent;
  let fixture: ComponentFixture<DrTaCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrTaCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrTaCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
