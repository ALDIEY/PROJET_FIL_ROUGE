import { TestBed } from '@angular/core/testing';

import { ResposableService } from './resposable.service';

describe('ResposableService', () => {
  let service: ResposableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResposableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
