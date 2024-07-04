import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioEditarComponent } from './admin-usuario-editar.component';

describe('AdminUsuarioEditarComponent', () => {
  let component: AdminUsuarioEditarComponent;
  let fixture: ComponentFixture<AdminUsuarioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsuarioEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
