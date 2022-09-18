import { TestBed } from '@angular/core/testing';

import { FavoritesubjectsService } from './favoritesubjects.service';

describe('FavoritesubjectsService', () => {
  let service: FavoritesubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
