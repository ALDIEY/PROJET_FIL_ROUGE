import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAttacheComponent } from './session-attache.component';

describe('SessionAttacheComponent', () => {
  let component: SessionAttacheComponent;
  let fixture: ComponentFixture<SessionAttacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionAttacheComponent]
    });
    fixture = TestBed.createComponent(SessionAttacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
