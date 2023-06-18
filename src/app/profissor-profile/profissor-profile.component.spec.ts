import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissorProfileComponent } from './profissor-profile.component';

describe('ProfissorProfileComponent', () => {
  let component: ProfissorProfileComponent;
  let fixture: ComponentFixture<ProfissorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfissorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfissorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
