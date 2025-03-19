import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInPageService {
  private apiUrl = "/api";
  constructor(private http: HttpClient) {}

  signInUser(userData: any): Observable<any> {
    const userDataToSend = {
      phone: userData.phone,
      password: userData.password,
    };
    return this.http.post(this.apiUrl + '/User/auth/sign-in', userDataToSend, {
      withCredentials: true,
    });
  }
}
