import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPasswardComponentComponent } from './rest-passward-component.component';

describe('RestPasswardComponentComponent', () => {
  let component: RestPasswardComponentComponent;
  let fixture: ComponentFixture<RestPasswardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestPasswardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestPasswardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
