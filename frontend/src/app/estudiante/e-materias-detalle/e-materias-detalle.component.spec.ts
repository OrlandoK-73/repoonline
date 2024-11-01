import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMateriasDetalleComponent } from './e-materias-detalle.component';

describe('EMateriasDetalleComponent', () => {
  let component: EMateriasDetalleComponent;
  let fixture: ComponentFixture<EMateriasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMateriasDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EMateriasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
