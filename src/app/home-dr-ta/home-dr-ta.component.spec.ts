import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDrTaComponent } from './home-dr-ta.component';

describe('HomeDrTaComponent', () => {
  let component: HomeDrTaComponent;
  let fixture: ComponentFixture<HomeDrTaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDrTaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDrTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
