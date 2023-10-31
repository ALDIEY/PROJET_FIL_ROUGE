import { TestBed } from '@angular/core/testing';

import { AttacheService } from './service/attache.service';

describe('AttacheService', () => {
  let service: AttacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
