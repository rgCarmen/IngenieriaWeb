import { TestBed } from '@angular/core/testing';

import { ClinicalHistoryService } from './clinical-history.service';

describe('ClinicalHistoryService', () => {
  let service: ClinicalHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
