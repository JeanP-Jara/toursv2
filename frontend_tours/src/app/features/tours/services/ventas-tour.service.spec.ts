import { TestBed } from '@angular/core/testing';

import { VentasTourService } from './ventas-tour.service';

describe('VentasTourService', () => {
  let service: VentasTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
