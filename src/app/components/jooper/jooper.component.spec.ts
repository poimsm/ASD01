import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JooperComponent } from './jooper.component';

describe('JooperComponent', () => {
  let component: JooperComponent;
  let fixture: ComponentFixture<JooperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JooperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JooperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
