import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCAIChatComponent } from './fcaichat.component';

describe('FCAIChatComponent', () => {
  let component: FCAIChatComponent;
  let fixture: ComponentFixture<FCAIChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCAIChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FCAIChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
