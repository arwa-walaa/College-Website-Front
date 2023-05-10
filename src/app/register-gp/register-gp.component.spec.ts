import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGpComponent } from './register-gp.component';

describe('RegisterGpComponent', () => {
  let component: RegisterGpComponent;
  let fixture: ComponentFixture<RegisterGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
