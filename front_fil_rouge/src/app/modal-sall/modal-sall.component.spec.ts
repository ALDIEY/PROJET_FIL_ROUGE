import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSallComponent } from './modal-sall.component';

describe('ModalSallComponent', () => {
  let component: ModalSallComponent;
  let fixture: ComponentFixture<ModalSallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSallComponent]
    });
    fixture = TestBed.createComponent(ModalSallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
