import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaSchedualeComponent } from './ta-scheduale.component';

describe('TaSchedualeComponent', () => {
  let component: TaSchedualeComponent;
  let fixture: ComponentFixture<TaSchedualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaSchedualeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaSchedualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
