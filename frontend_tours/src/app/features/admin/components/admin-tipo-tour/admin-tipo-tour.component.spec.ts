import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoTourComponent } from './admin-tipo-tour.component';

describe('AdminTipoTourComponent', () => {
  let component: AdminTipoTourComponent;
  let fixture: ComponentFixture<AdminTipoTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTipoTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTipoTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
