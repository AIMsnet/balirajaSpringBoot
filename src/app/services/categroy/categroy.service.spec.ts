import { TestBed } from '@angular/core/testing';

import { CategroyService } from './categroy.service';

describe('CategroyService', () => {
  let service: CategroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
