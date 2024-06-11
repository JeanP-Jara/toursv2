import { TestBed } from '@angular/core/testing';

import { TipoToursService } from './tipo-tours.service';

describe('TipoToursService', () => {
  let service: TipoToursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoToursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
