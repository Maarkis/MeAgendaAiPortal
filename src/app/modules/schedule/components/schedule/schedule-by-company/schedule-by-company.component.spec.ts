import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleByCompanyComponent } from './schedule-by-company.component';

describe('ScheduleByCompanyComponent', () => {
  let component: ScheduleByCompanyComponent;
  let fixture: ComponentFixture<ScheduleByCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleByCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
