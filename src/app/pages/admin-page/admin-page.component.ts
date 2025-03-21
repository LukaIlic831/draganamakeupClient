import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentCalendarComponent } from '../appointment-page/components/appointment-calendar/appointment-calendar.component';
import { GetUserService } from '../../services/get-user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import moment, { Moment } from 'moment';
import { AdminPageService } from './services/admin-page.service';
import { AdminAppointmentComponent } from './components/admin-appointment/admin-appointment.component';
import { User } from '../../models/user.model';
import { AppInterface, Appointment } from '../../models/appointment.model';
import { Router } from '@angular/router';
import { AdminScheduleComponent } from './components/admin-schedule/admin-schedule.component';
interface Days {
  date: string;
  allAppointments: AppInterface[];
}

@Component({
  selector: 'app-admin-page',
  imports: [
    AppointmentCalendarComponent,
    MatCardModule,
    CommonModule,
    AdminAppointmentComponent,
    AdminScheduleComponent,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit {
  isAdmin: boolean = true;
  user: User | null = null;
  days: Days[] = [];
  noAppointments: boolean = false;
  isScheduleVisible: boolean = false;
  @ViewChild(AppointmentCalendarComponent) calendarComponent!: AppointmentCalendarComponent;

  constructor(
    private getUserService: GetUserService,
    private adminService: AdminPageService,
    private router: Router
  ) {
  }

  setDays(){
    this.days = [];
    let currentDate = moment();
    let weekStart = moment().clone().startOf('isoWeek');
    this.days.push({
      date: currentDate.format('DD MMM YYYY'),
      allAppointments: [],
    });
    for (let i = 0; i <= 13; i++) {
      this.days.push({
        date: moment(weekStart).add(i, 'day').format('DD MMM YYYY'),
        allAppointments: [],
      });
    }
  }

  openAdminSchedule() {
    this.isScheduleVisible = true;
  }

  updateIsScheduleVisible(isScheduleVisible: boolean) {
    this.isScheduleVisible = isScheduleVisible;
  }

  trackByDate(index: number, day: Days): string {
    return day.date;
  }

  trackById(index: number, appointment: Appointment): number {
    return appointment.user!.id;
  }

  ngOnInit() {
    this.getUserService.getAdmin().subscribe({
      next: (res) => {
        this.user = res;
        this.getAppointments();
      },
      error: (err) => {
        this.router.navigate(['/sign-in']);
      },
    });
  }

  sortAppointmentsByTime() {
    this.days.map((day) => {
      day.allAppointments.sort(
        (a, b) => a.startTime.unix() - b.startTime.unix()
      );
    });
  }

  getAppointments = () => {
    this.setDays();
    this.calendarComponent.getAppointments();
    this.adminService.getAppointments().subscribe({
      next: (res) => {
        res.length === 0 && (this.noAppointments = true);
        res?.map((app: AppInterface) => {
          let findDay = this.days.find(
            (day: any) =>
              day.date ===
              moment.utc(app.startTime).local().format('DD MMM YYYY')
          );
          app.startTime = moment.utc(app.startTime).local();
          app.date = app.startTime.format('D/M/YYYY');
          app.time = app.startTime.format('HH:mm');
          findDay && findDay.allAppointments.push(app);
        });
        this.sortAppointmentsByTime();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
