import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tablero2Component } from './tablero2.component';

describe('Tablero2Component', () => {
  let component: Tablero2Component;
  let fixture: ComponentFixture<Tablero2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tablero2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tablero2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
