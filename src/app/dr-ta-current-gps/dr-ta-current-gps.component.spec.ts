import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrTaCurrentGPsComponent } from './dr-ta-current-gps.component';

describe('DrTaCurrentGPsComponent', () => {
  let component: DrTaCurrentGPsComponent;
  let fixture: ComponentFixture<DrTaCurrentGPsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrTaCurrentGPsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrTaCurrentGPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
