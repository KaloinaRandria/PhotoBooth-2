import { TestBed } from '@angular/core/testing';

import { ServicesBoothService } from './services-booth.service';

describe('ServicesBoothService', () => {
  let service: ServicesBoothService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesBoothService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
