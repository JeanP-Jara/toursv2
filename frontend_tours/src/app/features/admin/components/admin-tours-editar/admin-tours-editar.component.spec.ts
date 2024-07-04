import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToursEditarComponent } from './admin-tours-editar.component';

describe('AdminToursEditarComponent', () => {
  let component: AdminToursEditarComponent;
  let fixture: ComponentFixture<AdminToursEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminToursEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminToursEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
