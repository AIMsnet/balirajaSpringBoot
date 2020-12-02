import { TestBed } from '@angular/core/testing';

import { EmitServiceService } from './emit-service.service';

describe('EmitServiceService', () => {
  let service: EmitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
