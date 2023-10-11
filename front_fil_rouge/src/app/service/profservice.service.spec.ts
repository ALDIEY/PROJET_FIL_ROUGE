import { TestBed } from '@angular/core/testing';

import { ProfserviceService } from './profservice.service';

describe('ProfserviceService', () => {
  let service: ProfserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
