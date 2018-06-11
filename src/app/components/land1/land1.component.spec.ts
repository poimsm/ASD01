import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Land1Component } from './land1.component';

describe('Land1Component', () => {
  let component: Land1Component;
  let fixture: ComponentFixture<Land1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Land1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Land1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
