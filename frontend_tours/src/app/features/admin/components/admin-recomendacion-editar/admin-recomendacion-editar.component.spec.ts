import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecomendacionEditarComponent } from './admin-recomendacion-editar.component';

describe('AdminRecomendacionEditarComponent', () => {
  let component: AdminRecomendacionEditarComponent;
  let fixture: ComponentFixture<AdminRecomendacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecomendacionEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecomendacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
