import { Component, OnInit } from '@angular/core';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../shared/patient.service';
import { colorSchemeDark } from 'ag-grid-community';

import { Patient } from './patient';
import { ActionCellRendererComponent } from '../../action-cell-renderer/action-cell-renderer.component';

ModuleRegistry.registerModules([AllCommunityModule])


@Component({
  selector: 'app-patient-list',
  imports: [AgGridAngular, MatToolbarModule, MatIconModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {

  gridApi: GridApi | undefined;

  columnDefs: ColDef[] = [
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
      width: 120,
      sortable: false,
      filter: false,
      pinned: true
    },
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
    { headerName: 'Previous Illness', field: 'previousIllness' }
  ];
  public defaultColDef: ColDef = {
    width: 150,
  };

  frameworkComponents = {
    actionCellRenderer: ActionCellRendererComponent
  };
  getRowHeight = (params: any) => {
    return 48;
  };

  public rowData: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.fetchPatientListData().subscribe({
      next: (res) => {
        this.rowData = res.data as Patient[];
        if (this.gridApi) {
          this.gridApi.setGridOption("rowData", this.rowData);
          this.gridApi.setGridOption("theme", themeQuartz.withParams({
            backgroundColor: 'rgb(243, 255, 243)',              // very light green background
            foregroundColor: 'rgb(34, 70, 34)',                 // dark green text
            headerTextColor: 'rgb(255, 255, 255)',              // white header text
            headerBackgroundColor: 'rgb(83, 157, 103)',         // rich mid green for headers
            oddRowBackgroundColor: 'rgba(0, 0, 0, 0.02)',       // subtle zebra striping
            headerColumnResizeHandleColor: 'rgb(51, 102, 51)',  // deep green for handle
          }))
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
