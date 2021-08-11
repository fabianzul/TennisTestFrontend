import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service.service';

describe('Client.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientService = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });
});
