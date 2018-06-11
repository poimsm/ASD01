import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Land2Component } from './land2.component';

describe('Land2Component', () => {
  let component: Land2Component;
  let fixture: ComponentFixture<Land2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Land2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Land2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
