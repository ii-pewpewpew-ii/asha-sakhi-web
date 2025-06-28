import { Component, OnInit } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../shared/patient.service';
import { Patient } from './patient';

ModuleRegistry.registerModules([AllCommunityModule])


@Component({
  selector: 'app-patient-list',
    imports: [AgGridAngular, MatToolbarModule, MatIconModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit{

  gridApi: GridApi | undefined;

 columnDefs: ColDef[] = [
    { headerName: 'Patient ID', field: 'patientId' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'State', field: 'state' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Language', field: 'languagePreference' },
    { headerName: 'Date of Birth', field: 'dateOfBirth' },
    { headerName: 'Delivery Date', field: 'deliveryDate' },
    { headerName: 'Mobile', field: 'mobileNumber' },
    { headerName: 'Employment', field: 'employmentStatus' },
    { headerName: 'Religion', field: 'religion' },
    { headerName: 'Education', field: 'education' },
    { headerName: 'Caste', field: 'caste' },
    { headerName: 'Blood Group', field: 'bloodGroup' },
    { headerName: 'LMP', field: 'lmp' },
    { headerName: 'Previous Illness', field: 'previousIllness' },
    
  ];
  public defaultColDef: ColDef = {
    width: 150,
  };
   public themeClass: string =
    "ag-theme-quartz-dark";

  public rowData: Patient[] = [];

  constructor( private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.fetchPatientListData().subscribe({
      next: (res) => {
        this.rowData = res.data as Patient[];
        if(this.gridApi) { 
          this.gridApi.setGridOption("rowData", this.rowData);
        }
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  gridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }
}
