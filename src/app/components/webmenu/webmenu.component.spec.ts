import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmenuComponent } from './webmenu.component';

describe('WebmenuComponent', () => {
  let component: WebmenuComponent;
  let fixture: ComponentFixture<WebmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
