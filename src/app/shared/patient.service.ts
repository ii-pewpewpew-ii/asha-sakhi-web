import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL, SakhiApiResponse } from './shared';
import { Observable } from 'rxjs';
import { Patient } from '../dashboard/patient-list/patient';
import { Appointment } from '../dashboard/appointment-list/appointment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  fetchPatientListData() {
    return this.http.get<SakhiApiResponse<Patient[]>>(API_BASE_URL + "patient/patient-list");
  }

  fetchAppointments(workerId?: number) {
    let params = new HttpParams();
    if(workerId) {
      params = params.set("workerId", workerId)
    }
    return this.http.get<SakhiApiResponse<Appointment[]>>(API_BASE_URL + "appointment/fetch-appointments", {params: params});
  }
}
