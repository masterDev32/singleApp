import { TestBed } from '@angular/core/testing';

import { HandleCallService } from './handle-call.service';

describe('HandleCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleCallService = TestBed.get(HandleCallService);
    expect(service).toBeTruthy();
  });
});
