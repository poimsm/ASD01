import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecienteComponent } from './reciente.component';

describe('RecienteComponent', () => {
  let component: RecienteComponent;
  let fixture: ComponentFixture<RecienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
