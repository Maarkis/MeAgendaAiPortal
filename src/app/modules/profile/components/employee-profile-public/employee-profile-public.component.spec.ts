import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilePublicComponent } from './employee-profile-public.component';

describe('EmployeeProfilePublicComponent', () => {
  let component: EmployeeProfilePublicComponent;
  let fixture: ComponentFixture<EmployeeProfilePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfilePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
