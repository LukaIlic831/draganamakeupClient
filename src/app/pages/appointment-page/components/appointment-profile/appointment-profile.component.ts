import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-appointment-profile',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './appointment-profile.component.html',
  styleUrl: './appointment-profile.component.css',
})
export class AppointmentProfileComponent {
  @Input() userData: User | null = null;
  constructor(private appointmentService: AppointmentService, private router: Router) {}

  signOut() {
    this.appointmentService.signOutUser().subscribe({
      next: () => {
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
