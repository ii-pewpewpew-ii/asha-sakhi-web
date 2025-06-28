import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL, SakhiApiResponse } from '../shared/shared';
import { Observable } from 'rxjs';
import { LoginResponse } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient) {  }

  login(mobileNumber: string, password: string): Observable<SakhiApiResponse<LoginResponse>>{
    return this.http.post <SakhiApiResponse<LoginResponse>>(API_BASE_URL+"auth/login",{
      mobileNumber: mobileNumber,
      password: password
    });
  }
}
