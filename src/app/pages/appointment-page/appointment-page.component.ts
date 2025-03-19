import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentProfileComponent } from './components/appointment-profile/appointment-profile.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';
import { GetUserService } from '../../services/get-user.service';
import { AppointmentScheduleMobileComponent } from './components/appointment-schedule-mobile/appointment-schedule-mobile.component';
import { AppointmentViewMobileComponent } from './components/appointment-view-mobile/appointment-view-mobile.component';
import { AppointmentService } from './services/appointment.service';
import moment from 'moment';
import { NgIf } from '@angular/common';
import { AppointmentCancelComponent } from './components/appointment-cancel/appointment-cancel.component';
import { AppointmentCancelMobileComponent } from './components/appointment-cancel-mobile/appointment-cancel-mobile.component';
import { User } from '../../models/user.model';
import {
  Appointment,
  ScheduledAppointment,
} from '../../models/appointment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-page',
  imports: [
    AppointmentProfileComponent,
    AppointmentCalendarComponent,
    AppointmentScheduleMobileComponent,
    AppointmentViewMobileComponent,
    AppointmentCancelMobileComponent,
    NgIf,
  ],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css',
})
export class AppointmentPageComponent implements OnInit {
  user: User | null = null;
  scheduledAppointment: ScheduledAppointment | null = null;
  isCancelVisible: boolean = false;
  isLoading: boolean = true;
  constructor(
    private getUserService: GetUserService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getUserService.getUser().subscribe({
      next: (res) => {
        this.user = res;
        this.getScheduledApp();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getScheduledApp = () => {
    this.appointmentService
      .getAppointmentByUserID(String(this.user!.id))
      .subscribe({
        next: (res) => {
          this.scheduledAppointment = res as ScheduledAppointment;
          if (this.scheduledAppointment) {
            this.scheduledAppointment.startTime = moment
              .utc(this.scheduledAppointment.startTime)
              .local();
            this.scheduledAppointment.canBeCanceled = !moment().isSameOrAfter(
              this.scheduledAppointment.startTime.add(-1, 'day')
            );
            this.scheduledAppointment.date = this.scheduledAppointment.startTime
              .add(1, 'day')
              .format('D/M/YYYY');
            this.scheduledAppointment.time =
              this.scheduledAppointment.startTime.format('HH:mm');
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
  };

  updateCancelVisibility(isCancelVisible: boolean) {
    this.isCancelVisible = isCancelVisible;
  }

  removeScheduledAppointment() {
    this.scheduledAppointment = null;
  }
}
