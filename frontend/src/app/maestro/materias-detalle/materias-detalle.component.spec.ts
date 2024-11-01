import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasDetalleComponent } from './materias-detalle.component';

describe('MateriasDetalleComponent', () => {
  let component: MateriasDetalleComponent;
  let fixture: ComponentFixture<MateriasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
