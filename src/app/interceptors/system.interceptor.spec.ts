import { TestBed } from '@angular/core/testing';

import { SystemInterceptor } from './system.interceptor';

describe('SystemInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SystemInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SystemInterceptor = TestBed.inject(SystemInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
