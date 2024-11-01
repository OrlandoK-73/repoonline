import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionMaestroComponent } from './asignacion-maestro.component';

describe('AsignacionMaestroComponent', () => {
  let component: AsignacionMaestroComponent;
  let fixture: ComponentFixture<AsignacionMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionMaestroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignacionMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
