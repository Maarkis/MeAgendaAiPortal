import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleByEmployeeComponent } from './schedule-by-employee.component';

describe('ScheduleByEmployeeComponent', () => {
  let component: ScheduleByEmployeeComponent;
  let fixture: ComponentFixture<ScheduleByEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleByEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
