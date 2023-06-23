import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDepartmentComponent } from './statistics-department.component';

describe('StatisticsDepartmentComponent', () => {
  let component: StatisticsDepartmentComponent;
  let fixture: ComponentFixture<StatisticsDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
