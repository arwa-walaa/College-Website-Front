import { TestBed } from '@angular/core/testing';

import { ProfessorTAService } from './professor-ta.service';

describe('ProfessorTAService', () => {
  let service: ProfessorTAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorTAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
