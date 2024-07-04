import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenidoEditarComponent } from './admin-contenido-editar.component';

describe('AdminContenidoEditarComponent', () => {
  let component: AdminContenidoEditarComponent;
  let fixture: ComponentFixture<AdminContenidoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContenidoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContenidoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
