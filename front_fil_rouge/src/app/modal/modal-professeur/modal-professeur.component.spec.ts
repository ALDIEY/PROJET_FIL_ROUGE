import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfesseurComponent } from './modal-professeur.component';

describe('ModalProfesseurComponent', () => {
  let component: ModalProfesseurComponent;
  let fixture: ComponentFixture<ModalProfesseurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProfesseurComponent]
    });
    fixture = TestBed.createComponent(ModalProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
