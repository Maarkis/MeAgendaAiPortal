import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddServicesComponent } from './modal-add-services.component';

describe('ModalAddServicesComponent', () => {
  let component: ModalAddServicesComponent;
  let fixture: ComponentFixture<ModalAddServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
