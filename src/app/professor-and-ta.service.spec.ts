import { TestBed } from '@angular/core/testing';

import { ProfessorAndTaService } from './professor-and-ta.service';

describe('ProfessorAndTaService', () => {
  let service: ProfessorAndTaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorAndTaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
