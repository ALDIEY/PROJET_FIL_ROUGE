import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionclasseComponent } from './gestionclasse.component';

describe('GestionclasseComponent', () => {
  let component: GestionclasseComponent;
  let fixture: ComponentFixture<GestionclasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionclasseComponent]
    });
    fixture = TestBed.createComponent(GestionclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
