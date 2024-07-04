import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecomendacionComponent } from './admin-recomendacion.component';

describe('AdminRecomendacionComponent', () => {
  let component: AdminRecomendacionComponent;
  let fixture: ComponentFixture<AdminRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecomendacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
