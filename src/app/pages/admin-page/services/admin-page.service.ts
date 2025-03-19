import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment.model';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminPageService {
  private apiUrl = "/api";
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      this.apiUrl + '/Appointment/get-appointments-admin'
    );
  }
}
