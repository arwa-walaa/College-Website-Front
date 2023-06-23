import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCoursesCompareComponent } from './statistics-courses-compare.component';

describe('StatisticsCoursesCompareComponent', () => {
  let component: StatisticsCoursesCompareComponent;
  let fixture: ComponentFixture<StatisticsCoursesCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsCoursesCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsCoursesCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
