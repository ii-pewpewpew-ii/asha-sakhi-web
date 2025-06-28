import { Component, OnInit } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { PatientService } from '../../shared/patient.service';
import { Appointment } from './appointment';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>event</mat-icon>
      <span>Appointments</span>
    </mat-toolbar>
    <div class="ag-container" style="width: 100%; height: 100%;">
      <ag-grid-angular
        style="width: 100%; height: 100%"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        class="ag-theme-quartz-dark"
        (gridReady)="gridReady($event)"
      ></ag-grid-angular>
    </div>
  `,
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  gridApi: GridApi | undefined;

  columnDefs: ColDef[] = [
    { headerName: 'Appointment ID', field: 'appointmentId' },
    { headerName: 'Patient ID', field: 'patientId' },
    { headerName: 'Worker ID', field: 'workerId' },
    { headerName: 'Date', field: 'appointmentDate' },
    { headerName: 'Status', field: 'appointmentStatus' },
    { headerName: 'Type', field: 'appointmentType' },
    { headerName: 'Created At', field: 'createdAt' },
    { headerName: 'Updated At', field: 'updatedAt' }
  ];

  public defaultColDef: ColDef = {
    width: 160,
    sortable: true,
    filter: true,
    resizable: true
  };

  public themeClass: string = 'ag-theme-quartz-dark';

  public rowData: Appointment[] = [];

  constructor(private patientService: PatientService) {


  }

  ngOnInit(): void {
    this.patientService.fetchAppointments().subscribe({
      next: (res) => {
        this.rowData = res.data as Appointment[];
        if (this.gridApi) {
          console.log("eerere")
          this.gridApi.setGridOption('rowData', this.rowData);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  gridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }
}
