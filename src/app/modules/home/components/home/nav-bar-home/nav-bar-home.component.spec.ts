import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarHomeComponent } from './nav-bar-home.component';

describe('NavBarHomeComponent', () => {
  let component: NavBarHomeComponent;
  let fixture: ComponentFixture<NavBarHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
