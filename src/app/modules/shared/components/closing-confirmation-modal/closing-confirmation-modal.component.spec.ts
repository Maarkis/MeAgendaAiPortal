import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingConfirmationModalComponent } from './closing-confirmation-modal.component';

describe('ClosingConfirmationModalComponent', () => {
  let component: ClosingConfirmationModalComponent;
  let fixture: ComponentFixture<ClosingConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
