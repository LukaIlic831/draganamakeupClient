import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentProfileComponent } from './appointment-profile.component';

describe('AppointmentProfileComponent', () => {
  let component: AppointmentProfileComponent;
  let fixture: ComponentFixture<AppointmentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
