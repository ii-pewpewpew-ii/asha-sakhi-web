import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserModule } from '@angular/platform-browser';
import { AllCommunityModule, ModuleRegistry, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { Checkup, Patient } from '../dashboard/patient-list/patient';
import { CheckupService } from '../shared/checkup.service';
import { PatientService } from '../shared/patient.service';
import { ActivatedRoute } from '@angular/router';
import { SakhiApiResponse } from '../shared/shared';
import { AgGridAngular } from 'ag-grid-angular';
import { Facility } from './patient';
@Component({
  selector: 'app-patient-profile',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatToolbarModule, MatCardModule, CommonModule, MatDatepickerModule, MatExpansionModule, AgGridAngular],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {

  constructor(private checkupService: CheckupService, private patientService: PatientService, private route: ActivatedRoute) {
    this.patientId = this.route.snapshot.queryParams['patientId'];
    ModuleRegistry.registerModules([AllCommunityModule])
  }

  nearestFacility?: Facility;
  facilityError?: string;
  columnDefs: ColDef[] = [
    { field: 'bloodPressure', headerName: 'Blood Pressure', editable: true },
    { field: 'oxygen', headerName: 'Oxygen Level', editable: true },
    { field: 'weight', headerName: 'Weight', editable: true },
    { field: 'temperature', headerName: 'Temperature', editable: true },
    { field: 'sugarLevel', headerName: 'Sugar Level', editable: true },
    { field: 'bmi', headerName: 'BMI', editable: true },
    { field: 'haemoglobin', headerName: 'Haemoglobin', editable: true },
    { field: 'pregnancyStage', headerName: 'Pregnancy Stage', editable: true }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true
  };

  gridApi: GridApi = {} as GridApi;
  patient: Patient = {};
  checkup?: Checkup[] = [];
  patientId: number = -1;
  ngOnInit(): void {
    this.patientService.fetchPatientData(this.patientId).subscribe((res) => {
      this.patient = (res as unknown as SakhiApiResponse<Patient>).data;
      this.checkup = this.patient.checkupData

      this.gridApi.setGridOption("rowData", this.checkup);
      this.gridApi.refreshCells();
    });
  }


  gridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.setGridOption("rowData", this.checkup);
    console.log(this.checkup);
  }

  // fetchNearestFacility() {
  //   const latestCheckup = this.patient.checkupData?.[0];
  //   if (latestCheckup && this.patient.latitude && this.patient.longtitude) {
  //     const risk = latestCheckup.riskCategory?.toLowerCase() ?? 'low';
  //     const facilityType = risk === 'low' ? 'phc' : risk === 'medium' ? 'college' : 'hospital';

  //     this.checkupService.getNearestFacility(facilityType, this.patient.latitude, this.patient.longtitude)
  //       .subscribe({
  //         next: (facility) => this.nearestFacility = facility,
  //         error: (err) => this.facilityError = "Could not fetch nearest facility."
  //       });
  //   }
  // }

}

