import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamHallsComponent } from './exam-halls.component';

describe('ExamHallsComponent', () => {
  let component: ExamHallsComponent;
  let fixture: ComponentFixture<ExamHallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamHallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
