import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCoursesComponent } from './statistics-courses.component';

describe('StatisticsCoursesComponent', () => {
  let component: StatisticsCoursesComponent;
  let fixture: ComponentFixture<StatisticsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
