import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiistercourComponent } from './liistercour.component';

describe('LiistercourComponent', () => {
  let component: LiistercourComponent;
  let fixture: ComponentFixture<LiistercourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiistercourComponent]
    });
    fixture = TestBed.createComponent(LiistercourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
