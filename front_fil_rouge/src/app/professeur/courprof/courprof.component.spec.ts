import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourprofComponent } from './courprof.component';

describe('CourprofComponent', () => {
  let component: CourprofComponent;
  let fixture: ComponentFixture<CourprofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourprofComponent]
    });
    fixture = TestBed.createComponent(CourprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
