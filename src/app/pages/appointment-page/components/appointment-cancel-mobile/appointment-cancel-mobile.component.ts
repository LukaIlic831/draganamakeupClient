import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-appointment-cancel-mobile',
  imports: [MatCardModule],
  templateUrl: './appointment-cancel-mobile.component.html',
  styleUrl: './appointment-cancel-mobile.component.css',
})
export class AppointmentCancelMobileComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() removeAppointmentEvent = new EventEmitter<void>();
  @Input() scheduledAppointmentID: number | undefined;
  isCancel = false;

  constructor(private appointmentService: AppointmentService) {}

  toggle() {
    !this.isCancel && this.toggleEvent.emit(false);
  }

  cancelAppointment() {
    this.isCancel = true;
    this.appointmentService
      .cancelAppointment(this.scheduledAppointmentID!.toString())
      .subscribe({
        next: () => {
          this.toggleEvent.emit(false);
          this.removeAppointmentEvent.emit();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
