import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpPageService {
  private apiUrl = "/api";
  constructor(private http: HttpClient) {}

  signUpUser(userData: any): Observable<any> {
    const userDataToSend = {
      username: userData.username,
      phone: userData.phone,
      password: userData.password,
      createdAt: new Date().toISOString(),
    };
    return this.http.post(this.apiUrl + '/User/auth/sign-up', userDataToSend, {withCredentials:true});
  }
}
