import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddServicesToEmployeeComponent } from './modal-add-services-to-employee.component';

describe('ModalAddServicesToEmployeeComponent', () => {
  let component: ModalAddServicesToEmployeeComponent;
  let fixture: ComponentFixture<ModalAddServicesToEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddServicesToEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddServicesToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
