import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { AppInterface } from '../../../../models/appointment.model';
import { AppointmentService } from '../../../appointment-page/services/appointment.service';
@Component({
  selector: 'app-admin-appointment',
  imports: [MatCardModule, CommonModule],
  templateUrl: './admin-appointment.component.html',
  styleUrl: './admin-appointment.component.css',
})
export class AdminAppointmentComponent {
  @Input() appointment: AppInterface | null = null;
  message: string = '';
  @Input() getAppointments!: () => void;

  constructor(private toastr: ToastrService, private appointmentService: AppointmentService) {
  }

  createMessage(selectedAppointment: AppInterface | null) {
    this.message = `Zdravo! 💄✨ Podsećam vas da imate zakazan termin za ${selectedAppointment?.date} u ${selectedAppointment?.time}, usluga: ${selectedAppointment?.service}. Radujem se vašem dolasku! DraganaMakeup`;
  }

  copyMessage() {
    navigator.clipboard
      .writeText(this.message)
      .then(() => {
        this.toastr.success('Poruka uspesno kopirana');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cancelAppointment() {
    this.appointmentService
      .cancelAppointment(this.appointment?.id.toString()!)
      .subscribe({
        next: () => {
          this.getAppointments();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
