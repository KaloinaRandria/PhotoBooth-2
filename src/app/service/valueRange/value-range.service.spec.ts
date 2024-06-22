import { TestBed } from '@angular/core/testing';

import { ValueRangeService } from './value-range.service';

describe('ValueRangeService', () => {
  let service: ValueRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
