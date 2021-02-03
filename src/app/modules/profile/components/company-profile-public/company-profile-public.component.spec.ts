import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfilePublicComponent } from './company-profile-public.component';

describe('CompanyProfilePublicComponent', () => {
  let component: CompanyProfilePublicComponent;
  let fixture: ComponentFixture<CompanyProfilePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfilePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
