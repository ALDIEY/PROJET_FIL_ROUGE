import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudResponsableComponent } from './crud-responsable.component';

describe('CrudResponsableComponent', () => {
  let component: CrudResponsableComponent;
  let fixture: ComponentFixture<CrudResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudResponsableComponent]
    });
    fixture = TestBed.createComponent(CrudResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
