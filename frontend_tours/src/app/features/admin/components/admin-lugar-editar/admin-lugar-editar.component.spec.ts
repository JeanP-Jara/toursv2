import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLugarEditarComponent } from './admin-lugar-editar.component';

describe('AdminLugarEditarComponent', () => {
  let component: AdminLugarEditarComponent;
  let fixture: ComponentFixture<AdminLugarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLugarEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLugarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
