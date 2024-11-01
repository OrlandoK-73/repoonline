import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EExamenComponent } from './e-examen.component';

describe('EExamenComponent', () => {
  let component: EExamenComponent;
  let fixture: ComponentFixture<EExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
