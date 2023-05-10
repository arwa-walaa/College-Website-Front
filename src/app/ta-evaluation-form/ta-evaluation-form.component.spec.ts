import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaEvaluationFormComponent } from './ta-evaluation-form.component';

describe('TaEvaluationFormComponent', () => {
  let component: TaEvaluationFormComponent;
  let fixture: ComponentFixture<TaEvaluationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaEvaluationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
