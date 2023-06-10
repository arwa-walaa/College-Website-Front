import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSchedualeComponent } from './place-scheduale.component';

describe('PlaceSchedualeComponent', () => {
  let component: PlaceSchedualeComponent;
  let fixture: ComponentFixture<PlaceSchedualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceSchedualeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceSchedualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
