import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepartamentoEditarComponent } from './admin-departamento-editar.component';

describe('AdminDepartamentoEditarComponent', () => {
  let component: AdminDepartamentoEditarComponent;
  let fixture: ComponentFixture<AdminDepartamentoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDepartamentoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDepartamentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
