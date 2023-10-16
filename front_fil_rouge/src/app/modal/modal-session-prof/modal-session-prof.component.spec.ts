import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSessionProfComponent } from './modal-session-prof.component';

describe('ModalSessionProfComponent', () => {
  let component: ModalSessionProfComponent;
  let fixture: ComponentFixture<ModalSessionProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSessionProfComponent]
    });
    fixture = TestBed.createComponent(ModalSessionProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
