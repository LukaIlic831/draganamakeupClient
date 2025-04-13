import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import moment, { Moment } from 'moment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { AppointmentSchedulerComponent } from '../appointment-scheduler/appointment-scheduler.component';
import { AppointmentCancelComponent } from '../appointment-cancel/appointment-cancel.component';
import { AppointmentViewComponent } from '../appointment-view/appointment-view.component';
import { User } from '../../../../models/user.model';
import { Appointment } from '../../../../models/appointment.model';

interface CalendarAppointment extends Appointment {
  day: number;
  isScheduledAbove: boolean;
}

interface CalendarAppointmentObject {
  time: string;
  nextTime: string;
  allAppointments: CalendarAppointment[];
}

@Component({
  selector: 'app-appointment-calendar',
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    AppointmentSchedulerComponent,
    AppointmentCancelComponent,
    AppointmentViewComponent,
  ],
  templateUrl: './appointment-calendar.component.html',
  styleUrl: './appointment-calendar.component.css',
})
export class AppointmentCalendarComponent implements OnInit, OnChanges {
  @Input() userData: User | null = null;
  @Input() isAdmin: boolean = false;
  weekDays: Moment[] = [];
  firstDayOfWeek: string = '';
  lastDayOfWeek: string = '';
  tomorrow: Moment;
  curDate: Moment;
  appointments: CalendarAppointmentObject[] = [];
  curAppointment: CalendarAppointment | undefined;
  selectedAppointment: CalendarAppointment | null = null;
  isThisWeek: boolean = true;
  isSchedulerVisible: boolean = false;
  isCancelVisible: boolean = false;
  isAppointmentVisible: boolean = false;
  hideFirstOption: boolean = false;
  selectedTime: string = '';
  selectedDate: Moment = moment();
  userAlreadyScheduled: boolean = false;
  isLoading: boolean = true;

  constructor(private appointmentService: AppointmentService) {
    this.tomorrow = moment().add(1, 'day');
    this.curDate = moment();
    this.setThisWekk();
  }

  setThisWekk() {
    this.weekDays = [];
    this.isThisWeek = true;
    this.firstDayOfWeek = moment()
      .clone()
      .startOf('isoWeek')
      .format('DD/MM/YYYY');
    this.lastDayOfWeek = moment().clone().endOf('isoWeek').format('DD/MM/YYYY');
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        moment(moment().clone().startOf('isoWeek')).add(i, 'day')
      );
    }
  }

  setPrevWeek() {
    this.weekDays = [];
    this.firstDayOfWeek = moment(this.firstDayOfWeek, 'DD/MM/YYYY')
      .clone()
      .subtract(1, 'week')
      .format('DD/MM/YYYY');
    this.lastDayOfWeek = moment(this.lastDayOfWeek, 'DD/MM/YYYY')
      .clone()
      .subtract(1, 'week')
      .format('DD/MM/YYYY');
    if (
      this.curDate.startOf('day').isSameOrAfter(moment(this.firstDayOfWeek, 'DD/MM/YYYY')) &&
      this.curDate.startOf('day').isSameOrBefore(moment(this.lastDayOfWeek, 'DD/MM/YYYY'))
    ) {
      this.isThisWeek = true;
    }
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        moment(this.firstDayOfWeek, 'DD/MM/YYYY').add(i, 'day')
      );
    }
  }

  setNextWeek() {
    this.weekDays = [];
    this.isThisWeek = false;
    this.firstDayOfWeek = moment(this.firstDayOfWeek, 'DD/MM/YYYY')
      .clone()
      .add(1, 'week')
      .format('DD/MM/YYYY');
    this.lastDayOfWeek = moment(this.lastDayOfWeek, 'DD/MM/YYYY')
      .clone()
      .add(1, 'week')
      .format('DD/MM/YYYY');
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        moment(this.firstDayOfWeek, 'DD/MM/YYYY').add(i, 'day')
      );
    }
  }

  addTimeToAppointments() {
    this.appointments = [];
    let startingTime = moment().set({ hour: 10, minute: 0, second: 0 });
    const endTime = moment().set({ hour: 21, minute: 0, second: 0 });
    let nextTime = moment().set({ hour: 10, minute: 30, second: 0 });
    while (
      startingTime.isBefore(endTime) &&
      startingTime.format('HH:mm') != '21:00'
    ) {
      this.appointments.push({
        allAppointments: [],
        time: startingTime.format('HH:mm'),
        nextTime: nextTime.format('HH:mm'),
      });
      nextTime.add(30, 'minutes');
      startingTime.add(30, 'minutes');
    }
  }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments = () => {
    this.isLoading = true;
    this.addTimeToAppointments();
    this.appointmentService.getAppointments().subscribe({
      next: (response) => {
        this.addRightAppointments(response as CalendarAppointment[]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    changes['userData'] &&
      this.userData &&
      this.appointmentService
        .getAppointmentByUserID(String(this.userData?.id))
        .subscribe({
          next: (response) => {
            response && (this.userAlreadyScheduled = true);
          },
          error: (err) => {
            console.error(err);
          },
        });
  }

  addRightAppointments(responseAppointments: CalendarAppointment[]) {
    responseAppointments.map((app) => {
      let appointmentHour = moment().set({
        hour: moment.utc(app.startTime).local().get('hour'),
        minute: moment.utc(app.startTime).local().get('minutes'),
        second: 0,
      });
      let appointment = this.appointments.find(
        (a: any) => a.time == appointmentHour.format('HH:mm')
      );
      if (appointment) {
        app.day = moment.utc(app.startTime).date();
        app.isScheduledAbove = false;
        appointment.allAppointments.push(app);
        if (app.duration == 60) {
          appointment = this.appointments.find(
            (a: any) => a.time == appointment!.nextTime
          );
          let nextApp = { ...app };
          nextApp.isScheduledAbove = true;
          appointment!.allAppointments.push(nextApp);
        }
      }
    });
    this.isLoading = false;
    this.isCancelVisible = false;
    this.isSchedulerVisible = false;
  }

  getAppointment(allAppointments: CalendarAppointment[], date: Moment) {
    this.curAppointment = allAppointments.find((ap) => moment(ap.startTime).startOf("day").isSame(date));
    return this.curAppointment;
  }

  updateSchedulerVisibility(isSchedulerVisible: boolean) {
    this.isSchedulerVisible = isSchedulerVisible;
  }

  updateCancelVisibility(isCancelVisible: boolean) {
    this.isCancelVisible = isCancelVisible;
  }

  updateViewVisibility(isAppointmentVisible: boolean) {
    this.isAppointmentVisible = isAppointmentVisible;
  }

  updateUserAlreadyScheduled(userAlreadyScheduled: boolean) {
    this.userAlreadyScheduled = userAlreadyScheduled;
  }

  openScheduler(time: string, selectedDate: Moment) {
    this.selectedDate = selectedDate;
    this.selectedTime = time;
    this.hideFirstOption = false;
    this.isSchedulerVisible = true;
    let selectedTime = this.appointments.find((ap) => ap.time == time);
    let TimeBelow =
      selectedTime &&
      this.appointments.find((ap) => ap.time == selectedTime.nextTime);
    if (TimeBelow) {
      TimeBelow.allAppointments.find((ap) => ap.day == selectedDate.date()) &&
        (this.hideFirstOption = true);
    } else {
      this.hideFirstOption = true;
    }
  }

  openCancel(event: Event, selectedAppointment: CalendarAppointment) {
    this.selectedAppointment = selectedAppointment;
    let selectedCell = event.target as HTMLTableCellElement;
    this.isCancelVisible = false;
    selectedCell.offsetParent?.classList.contains(
      'scheduled-appointment-user'
    ) && (this.isCancelVisible = true);
  }

  openAppointment(selectedAppointment: any) {
    this.selectedAppointment = selectedAppointment;
    this.isAppointmentVisible = true;
  }
}
