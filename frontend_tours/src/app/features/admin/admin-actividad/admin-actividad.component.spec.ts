import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActividadComponent } from './admin-actividad.component';

describe('AdminActividadComponent', () => {
  let component: AdminActividadComponent;
  let fixture: ComponentFixture<AdminActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
