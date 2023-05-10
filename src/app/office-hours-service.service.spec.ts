import { TestBed } from '@angular/core/testing';

import { OfficeHoursServiceService } from './office-hours-service.service';

describe('OfficeHoursServiceService', () => {
  let service: OfficeHoursServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeHoursServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
