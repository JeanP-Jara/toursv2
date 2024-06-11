import { TestBed } from '@angular/core/testing';

import { ExportarTablasService } from './exportar-tablas.service';

describe('ExportarTablasService', () => {
  let service: ExportarTablasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportarTablasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
