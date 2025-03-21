import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import moment from 'moment';
import { User } from '../../../../models/user.model';
import { AppointmentService } from '../../../appointment-page/services/appointment.service';

interface MobileAppointments {
  from: string;
  to: string;
}

@Component({
  selector: 'app-admin-schedule',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './admin-schedule.component.html',
  styleUrl: './admin-schedule.component.css',
})
export class AdminScheduleComponent {
  @Input() userData: User | null = null;
  @Input() getAppointments!: () => void;
  @Output() toggleEvent = new EventEmitter<boolean>();
  isError: boolean = false;
  days: string[] = [];
  appointments: MobileAppointments[] = [];
  appointmentsForMakeup: any = [];
  isSubmit: boolean = false;
  scheduleForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    appointmentStartTime: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(private appointmentService: AppointmentService) {
    let weekStart = moment().clone().startOf('isoWeek');
    for (let i = 0; i <= 13; i++) {
      this.days.push(moment(weekStart).add(i, 'day').format('DD MMM YYYY'));
    }
  }

  close() {
    !this.isSubmit && this.toggleEvent.emit(false);
  }

  onSelectService(event: MatSelectChange) {
    if (this.scheduleForm.value?.service === 'sminkanje') {
      let copyOfAppointments = this.appointments.map((ap) =>
        Object.assign({}, ap)
      );
      let appointmentsToRemove: MobileAppointments[] = [];
      copyOfAppointments.map((ap) => {
        let findAppointment = copyOfAppointments.find(
          (app) => app.from == ap.to
        );
        !findAppointment && appointmentsToRemove.push(ap);
      });
      let appointmentsForMakeup = copyOfAppointments.filter(
        (app) => !appointmentsToRemove.includes(app)
      );
      this.appointmentsForMakeup = appointmentsForMakeup.map((apm) => {
        apm.to = moment(apm.to, 'HH:mm').add(30, 'minutes').format('HH:mm');
        return apm;
      });
    }
  }

  onSelectDate(event: MatSelectChange) {
    this.scheduleForm.patchValue({
      service: '',
    });
    this.appointments = [];
    this.addTimeToAppointments();
    this.appointmentService.getAppointmentByDate(event.value).subscribe({
      next: (responseAppointments) => {
        responseAppointments.map((ap) => {
          let appointmentsToRemove = [];
          let appointmentStartHour = moment().set({
            hour: moment.utc(ap.startTime).local().get('hour'),
            minute: moment.utc(ap.startTime).local().get('minutes'),
            second: 0,
          });
          appointmentsToRemove.push(appointmentStartHour.format('HH:mm'));
          appointmentsToRemove.push(
            appointmentStartHour
              .add(ap.duration - 30, 'minutes')
              .format('HH:mm')
          );
          this.appointments = this.appointments.filter(
            (app) => !appointmentsToRemove.includes(app.from)
          );
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit(event: SubmitEvent) {
    if (this.scheduleForm.valid) {
      const appointmentDate = moment(
        `${this.scheduleForm.value.date} ${this.scheduleForm.value.appointmentStartTime}`,
        'DD MMM YYYY HH:mm'
      );
      const dataToSend = {
        startTime: appointmentDate.utc(),
        duration: this.scheduleForm.value.service == 'obrve' ? 30 : 60,
        service: this.scheduleForm.value.service,
        comment: '',
        username: this.scheduleForm.value.username,
        phone: this.scheduleForm.value.phone,
      };
      this.isSubmit = true;
      this.appointmentService
        .scheduleAppointment(dataToSend, this.userData!.sessionID)
        .subscribe({
          next: () => {
            this.getAppointments();
            this.isSubmit = false;
            this.close();
          },
          error: (err) => {
            this.isError = true;
            console.log(err);
          },
        });
    }
  }

  addTimeToAppointments() {
    let startingTime = moment().set({ hour: 10, minute: 0, second: 0 });
    const endTime = moment().set({ hour: 21, minute: 0, second: 0 });
    let nextTime = moment().set({ hour: 10, minute: 30, second: 0 });
    while (
      startingTime.isBefore(endTime) &&
      startingTime.format('HH:mm') != '21:00'
    ) {
      this.appointments.push({
        from: startingTime.format('HH:mm'),
        to: nextTime.format('HH:mm'),
      });
      nextTime.add(30, 'minutes');
      startingTime.add(30, 'minutes');
    }
  }
}
