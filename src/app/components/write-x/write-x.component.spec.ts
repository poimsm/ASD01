import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteXComponent } from './write-x.component';

describe('WriteXComponent', () => {
  let component: WriteXComponent;
  let fixture: ComponentFixture<WriteXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
