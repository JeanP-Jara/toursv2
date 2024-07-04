import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoContenidoComponent } from './admin-no-contenido.component';

describe('AdminNoContenidoComponent', () => {
  let component: AdminNoContenidoComponent;
  let fixture: ComponentFixture<AdminNoContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoContenidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNoContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
