import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifiercourComponent } from './planifiercour.component';

describe('PlanifiercourComponent', () => {
  let component: PlanifiercourComponent;
  let fixture: ComponentFixture<PlanifiercourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifiercourComponent]
    });
    fixture = TestBed.createComponent(PlanifiercourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
