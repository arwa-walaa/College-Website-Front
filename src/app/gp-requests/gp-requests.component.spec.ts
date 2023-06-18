import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpRequestsComponent } from './gp-requests.component';

describe('GpRequestsComponent', () => {
  let component: GpRequestsComponent;
  let fixture: ComponentFixture<GpRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
