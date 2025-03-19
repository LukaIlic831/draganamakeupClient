import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentScheduleMobileComponent } from './appointment-schedule-mobile.component';

describe('AppointmentScheduleMobileComponent', () => {
  let component: AppointmentScheduleMobileComponent;
  let fixture: ComponentFixture<AppointmentScheduleMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentScheduleMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentScheduleMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
