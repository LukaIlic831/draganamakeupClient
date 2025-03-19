import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ScheduledAppointment } from '../../../../models/appointment.model';

@Component({
  selector: 'app-appointment-view-mobile',
  imports: [MatCardModule, CommonModule],
  templateUrl: './appointment-view-mobile.component.html',
  styleUrl: './appointment-view-mobile.component.css',
})
export class AppointmentViewMobileComponent {
  @Input() scheduledAppointment: ScheduledAppointment | null = null;
  @Input() isCancelVisible: boolean = false;
  @Output() toggleEvent = new EventEmitter<boolean>();

  toggle() {
    this.toggleEvent.emit(true);
  }
}
