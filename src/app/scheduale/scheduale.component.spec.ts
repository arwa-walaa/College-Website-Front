import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedualeComponent } from './scheduale.component';

describe('SchedualeComponent', () => {
  let component: SchedualeComponent;
  let fixture: ComponentFixture<SchedualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedualeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
