import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiguiendoComponent } from './siguiendo.component';

describe('SiguiendoComponent', () => {
  let component: SiguiendoComponent;
  let fixture: ComponentFixture<SiguiendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiguiendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiguiendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
