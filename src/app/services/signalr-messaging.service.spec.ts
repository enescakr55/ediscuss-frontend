import { TestBed } from '@angular/core/testing';

import { SignalrMessagingService } from './signalr-messaging.service';

describe('SignalrMessagingService', () => {
  let service: SignalrMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
