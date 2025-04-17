import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../services/appointment.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import {
  AppInterface,
  Appointment,
} from '../../../../models/appointment.model';

@Component({
  selector: 'app-appointment-view',
  imports: [MatCardModule, CommonModule],
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.css',
})
export class AppointmentViewComponent implements OnInit {
  @Input() selectedAppointmentID: number | undefined;
  @Input() isAppointmentVisible: boolean = false;
  @Output() toggleEvent = new EventEmitter<boolean>();
  message: string = '';
  @Input() getAppointments!: () => void;
  selectedAppointment: AppInterface | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) {}
  createMessage() {
    this.message = `Zdravo! 💄✨ Podsećam vas da imate zakazan termin za ${this.selectedAppointment?.date} u ${this.selectedAppointment?.time}, usluga: ${this.selectedAppointment?.service}. Radujem se vašem dolasku! DraganaMakeup`;
  }

  copyMessage() {
    console.log(this.selectedAppointment);
    navigator.clipboard
      .writeText(this.message)
      .then(() => {
        this.toastr.success('Poruka uspesno kopirana');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  toggle(event: Event) {
    let clickedClass = event.target as HTMLDivElement;
    clickedClass.className == 'view__appointment--wrapper' &&
      this.toggleEvent.emit(false);
  }

  cancelAppointment() {
    this.appointmentService
      .cancelAppointment(this.selectedAppointmentID!.toString())
      .subscribe({
        next: () => {
          this.getAppointments();
          this.toggleEvent.emit(false);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  ngOnInit() {
    this.appointmentService
      .getAppointmentByID(String(this.selectedAppointmentID))
      .subscribe({
        next: (res) => {
          this.selectedAppointment = res;
          this.selectedAppointment.startTime = moment
            .utc(this.selectedAppointment.startTime)
            .local();
          this.selectedAppointment.date =
            this.selectedAppointment.startTime.format('D/M/YYYY');
          this.selectedAppointment.time =
            this.selectedAppointment.startTime.format('HH:mm');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
