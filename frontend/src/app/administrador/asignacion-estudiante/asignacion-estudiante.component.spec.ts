import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionEstudianteComponent } from './asignacion-estudiante.component';

describe('AsignacionEstudianteComponent', () => {
  let component: AsignacionEstudianteComponent;
  let fixture: ComponentFixture<AsignacionEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignacionEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
