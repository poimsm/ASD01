import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadoComponent } from './guardado.component';

describe('GuardadoComponent', () => {
  let component: GuardadoComponent;
  let fixture: ComponentFixture<GuardadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
