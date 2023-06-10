import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSchedualeComponent } from './professor-scheduale.component';

describe('ProfessorSchedualeComponent', () => {
  let component: ProfessorSchedualeComponent;
  let fixture: ComponentFixture<ProfessorSchedualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorSchedualeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorSchedualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
