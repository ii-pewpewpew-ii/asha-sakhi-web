import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, Hospital, SakhiApiResponse } from './shared';
import { Checkup } from '../dashboard/patient-list/patient';

@Injectable({
  providedIn: 'root'
})
export class CheckupService {


  constructor(private http: HttpClient) { }

  sendReminderForAppointment(appointmentId: number): Observable<SakhiApiResponse<{ reminderSent: boolean }>> {
    return this.http.post<SakhiApiResponse<{ reminderSent: boolean }>>(API_BASE_URL + `appointment/send-reminder`, { appointmentId });
  }

  fetchHospitals() {
    return this.http.get<SakhiApiResponse<Hospital[]>>(API_BASE_URL + `hospital/fetch-all`);
  }

  fetchCheckupsByIds(id: number): Observable<SakhiApiResponse<Checkup[]>> {
    let params = new HttpParams();
    params = params.append("appointmentId", id);
    return this.http.get<SakhiApiResponse<Checkup[]>>(API_BASE_URL + 'appointment/fetch-associated-checkups', { params: params });
  }
}
