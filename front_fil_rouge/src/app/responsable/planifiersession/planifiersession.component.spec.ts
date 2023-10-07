import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifiersessionComponent } from './planifiersession.component';

describe('PlanifiersessionComponent', () => {
  let component: PlanifiersessionComponent;
  let fixture: ComponentFixture<PlanifiersessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifiersessionComponent]
    });
    fixture = TestBed.createComponent(PlanifiersessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
