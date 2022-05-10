import { TestBed } from '@angular/core/testing';

import { OffersApiService } from './offers-api.service';

describe('OffersApiService', () => {
  let service: OffersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
