import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = "/api";
  constructor(private http: HttpClient) {}
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      this.apiUrl + '/Appointment/get-appointments'
    );
  }

  scheduleAppointment(
    appointmentData: {
      startTime: moment.Moment;
      duration: number;
      service: string;
      comment: string;
  },
    userSession: string
  ): Observable<any> {
    return this.http.post(
      this.apiUrl + '/Appointment/schedule-appointment/' + userSession,
      appointmentData
    );
  }

  cancelAppointment(appointmentID: string): Observable<any> {
    return this.http.delete(
      this.apiUrl + '/Appointment/delete-appointment/' + appointmentID
    );
  }

  signOutUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/User/auth/sign-out', {
      withCredentials: true,
    });
  }

  getAppointmentByID(appID: string): Observable<Appointment> {
    return this.http.get<Appointment>(
      this.apiUrl + '/Appointment/get-appointment-by/' + appID
    );
  }

  getAppointmentByUserID(userID: string): Observable<Appointment> {
    return this.http.get<Appointment>(
      this.apiUrl + '/Appointment/get-appointment/' + userID
    );
  }

  getAppointmentByDate(appointmentDate: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      this.apiUrl +
        '/Appointment/get-appointment-by-date/' +
        appointmentDate
    );
  }
}
