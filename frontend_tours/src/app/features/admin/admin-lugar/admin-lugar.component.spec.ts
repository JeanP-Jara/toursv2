import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLugarComponent } from './admin-lugar.component';

describe('AdminLugarComponent', () => {
  let component: AdminLugarComponent;
  let fixture: ComponentFixture<AdminLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
