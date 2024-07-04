import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActividadEditarComponent } from './admin-actividad-editar.component';

describe('AdminActividadEditarComponent', () => {
  let component: AdminActividadEditarComponent;
  let fixture: ComponentFixture<AdminActividadEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActividadEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActividadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
