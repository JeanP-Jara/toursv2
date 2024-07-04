import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoContenidoEditarComponent } from './admin-no-contenido-editar.component';

describe('AdminNoContenidoEditarComponent', () => {
  let component: AdminNoContenidoEditarComponent;
  let fixture: ComponentFixture<AdminNoContenidoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoContenidoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNoContenidoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
