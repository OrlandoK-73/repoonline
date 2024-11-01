import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMisNotasComponent } from './e-mis-notas.component';

describe('EMisNotasComponent', () => {
  let component: EMisNotasComponent;
  let fixture: ComponentFixture<EMisNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMisNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EMisNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
