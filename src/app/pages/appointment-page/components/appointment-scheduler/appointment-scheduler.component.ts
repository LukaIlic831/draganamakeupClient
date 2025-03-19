import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../services/appointment.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-appointment-scheduler',
  imports: [MatCardModule, NgIf, FormsModule, NgClass],
  templateUrl: './appointment-scheduler.component.html',
  styleUrl: './appointment-scheduler.component.css',
})
export class AppointmentSchedulerComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() userAlreadyScheduledEvent = new EventEmitter<boolean>();
  @Input() getAppointments!: () => void;
  @Input() hideFirstOption: boolean = false;
  @Input() userSession: any;
  @Input() time: string = '';
  @Input() date: Moment = moment();
  selectedService: string = '';
  isSubmit: boolean = false;
  comment: string = '';
  isError: boolean = false;

  constructor(private appointmentService: AppointmentService) {}

  toggle(event: Event) {
    let clickedClass = event.target as HTMLDivElement;
    !this.isSubmit &&
      clickedClass.className == 'appointment__schedule--wrapper' &&
      this.toggleEvent.emit(false);
  }

  scheduleAppointment() {
    this.isSubmit = true;
    const appointmentDate = moment(
      `${this.date.format('DD MMM YYYY')} ${this.time}`,
      'DD MMM YYYY HH:mm'
    );
    const dataToSend = {
      startTime: appointmentDate.utc(),
      duration: this.selectedService == 'obrve' ? 30 : 60,
      service: this.selectedService,
      comment: this.comment,
    };
    this.appointmentService
      .scheduleAppointment(dataToSend, this.userSession)
      .subscribe({
        next: () => {
          this.getAppointments();
          this.userAlreadyScheduledEvent.emit(true);
        },
        error: (err) => {
          console.log(err);
          this.isError = true;
        },
      });
  }
}
