import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  private apiUrl = "/api";
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/User/auth/get-user', {
      withCredentials: true,
    });
  }

  getAdmin(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/User/auth/get-admin', {
      withCredentials: true,
    });
  }
}
