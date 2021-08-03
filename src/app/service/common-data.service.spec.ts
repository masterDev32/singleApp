import { TestBed } from '@angular/core/testing';

import { CommonDataService } from './common-data.service';

describe('CommonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    window.fetch = () => <any>Promise.resolve({
      json: () => []
    })
  });

  it('should be created', () => {
    const service: CommonDataService = TestBed.get(CommonDataService);
    expect(service).toBeTruthy();
  });
});
