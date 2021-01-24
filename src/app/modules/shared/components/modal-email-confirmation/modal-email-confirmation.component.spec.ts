import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmailConfirmationComponent } from './modal-email-confirmation.component';

describe('ModalEmailConfirmationComponent', () => {
  let component: ModalEmailConfirmationComponent;
  let fixture: ComponentFixture<ModalEmailConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmailConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
