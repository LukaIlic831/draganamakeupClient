import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-cancel',
  imports: [MatCardModule],
  templateUrl: './appointment-cancel.component.html',
  styleUrl: './appointment-cancel.component.css',
})
export class AppointmentCancelComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() userAlreadyScheduledEvent = new EventEmitter<boolean>();
  @Input() selectedAppointmentID: number | undefined;
  @Input() getAppointments!: () => void;
  isCancel = false;

  constructor(private appointmentService: AppointmentService) {}

  toggle() {
    !this.isCancel && this.toggleEvent.emit(false);
  }

  cancelAppointment() {
    this.isCancel = true;
    this.appointmentService
      .cancelAppointment(this.selectedAppointmentID!.toString())
      .subscribe({
        next: () => {
          this.getAppointments();
          this.userAlreadyScheduledEvent.emit(false);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
