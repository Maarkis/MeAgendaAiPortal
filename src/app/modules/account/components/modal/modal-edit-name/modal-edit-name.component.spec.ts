import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditNameComponent } from './modal-edit-name.component';

describe('ModalEditNameComponent', () => {
  let component: ModalEditNameComponent;
  let fixture: ComponentFixture<ModalEditNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
