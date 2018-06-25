import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Land4Component } from './land4.component';

describe('Land4Component', () => {
  let component: Land4Component;
  let fixture: ComponentFixture<Land4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Land4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Land4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
