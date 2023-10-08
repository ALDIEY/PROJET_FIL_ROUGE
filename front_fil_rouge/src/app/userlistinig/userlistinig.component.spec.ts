import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistinigComponent } from './userlistinig.component';

describe('UserlistinigComponent', () => {
  let component: UserlistinigComponent;
  let fixture: ComponentFixture<UserlistinigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlistinigComponent]
    });
    fixture = TestBed.createComponent(UserlistinigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
