import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCancelMobileComponent } from './appointment-cancel-mobile.component';

describe('AppointmentCancelMobileComponent', () => {
  let component: AppointmentCancelMobileComponent;
  let fixture: ComponentFixture<AppointmentCancelMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCancelMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCancelMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
