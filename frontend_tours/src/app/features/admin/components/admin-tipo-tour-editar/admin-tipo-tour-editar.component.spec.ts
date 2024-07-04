import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoTourEditarComponent } from './admin-tipo-tour-editar.component';

describe('AdminTipoTourEditarComponent', () => {
  let component: AdminTipoTourEditarComponent;
  let fixture: ComponentFixture<AdminTipoTourEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTipoTourEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTipoTourEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
