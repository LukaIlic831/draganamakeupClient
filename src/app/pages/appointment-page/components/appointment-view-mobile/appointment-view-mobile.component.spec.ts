import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentViewMobileComponent } from './appointment-view-mobile.component';

describe('AppointmentViewMobileComponent', () => {
  let component: AppointmentViewMobileComponent;
  let fixture: ComponentFixture<AppointmentViewMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentViewMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
