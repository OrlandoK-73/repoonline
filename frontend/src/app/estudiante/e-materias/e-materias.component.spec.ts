import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMateriasComponent } from './e-materias.component';

describe('EMateriasComponent', () => {
  let component: EMateriasComponent;
  let fixture: ComponentFixture<EMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
