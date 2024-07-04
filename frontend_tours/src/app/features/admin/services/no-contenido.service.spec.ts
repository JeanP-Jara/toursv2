import { TestBed } from '@angular/core/testing';

import { NoContenidoService } from './no-contenido.service';

describe('NoContenidoService', () => {
  let service: NoContenidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoContenidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
