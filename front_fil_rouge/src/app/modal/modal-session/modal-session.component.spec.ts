import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSessionComponent } from './modal-session.component';

describe('ModalSessionComponent', () => {
  let component: ModalSessionComponent;
  let fixture: ComponentFixture<ModalSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSessionComponent]
    });
    fixture = TestBed.createComponent(ModalSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
