import { TestBed } from '@angular/core/testing';

import { SavedCodeService } from './saved-code.service';

describe('SavedCodeService', () => {
  let service: SavedCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
