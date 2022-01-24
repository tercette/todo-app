import { TestBed } from '@angular/core/testing';

import { ReasonPopupService } from './reason-popup.service';

describe('ReasonPopupService', () => {
  let service: ReasonPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
