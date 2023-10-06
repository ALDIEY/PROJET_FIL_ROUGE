import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutrespoComponent } from './ajoutrespo.component';

describe('AjoutrespoComponent', () => {
  let component: AjoutrespoComponent;
  let fixture: ComponentFixture<AjoutrespoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutrespoComponent]
    });
    fixture = TestBed.createComponent(AjoutrespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
