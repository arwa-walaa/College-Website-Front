import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeHoursComponent } from './add-office-hours.component';

describe('AddOfficeHoursComponent', () => {
  let component: AddOfficeHoursComponent;
  let fixture: ComponentFixture<AddOfficeHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfficeHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficeHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
