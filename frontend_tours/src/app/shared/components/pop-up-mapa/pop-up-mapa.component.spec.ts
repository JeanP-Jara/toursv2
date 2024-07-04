import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMapaComponent } from './pop-up-mapa.component';

describe('PopUpMapaComponent', () => {
  let component: PopUpMapaComponent;
  let fixture: ComponentFixture<PopUpMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpMapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
