import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHoursComponentComponent } from './office-hours-component.component';

describe('OfficeHoursComponentComponent', () => {
  let component: OfficeHoursComponentComponent;
  let fixture: ComponentFixture<OfficeHoursComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeHoursComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeHoursComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
