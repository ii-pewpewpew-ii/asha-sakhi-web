import { Component, OnInit } from '@angular/core';
import { AllCommunityModule, colorSchemeDark, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientService } from '../../shared/patient.service';
import { Appointment } from './appointment';
import { ActionButtonRendererComponent } from '../../action-button-renderer/action-button-renderer.component';
import { CheckupService } from '../../shared/checkup.service';
import { CheckupPopupGridComponent } from '../../checkup-popup-grid/checkup-popup-grid.component';
import { MatButtonModule } from '@angular/material/button';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar style="background-color: #A3DC9A; color: black;">
  <span>Appointments</span>
</mat-toolbar>
    <br>
    <div class="ag-container" style=" height: 80%;">
      <ag-grid-angular
        style="height: 80%"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        class="ag-theme-quartz-dark"
        (gridReady)="gridReady($event)"
        [components]="frameworkComponents"
      ></ag-grid-angular>
    </div>
  `,
})
export class AppointmentListComponent implements OnInit {
  gridApi: GridApi | undefined;

  columnDefs: ColDef[] = [
    { headerName: 'Patient Name', field: 'patientname' },
    { headerName: 'Worker Name', field: 'workername' },
    {
      headerName: 'Date', field: 'appointmentDate', valueFormatter: (params) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB');
      }
    },
    { headerName: 'Status', field: 'appointmentStatus' },
    {
      headerName: 'Action',
      cellRenderer: 'actionButtonRenderer'
    },
  ];

  public defaultColDef: ColDef = {
    width: 160,
    sortable: true,
    filter: true,
    resizable: true
  };

  frameworkComponents = {
    actionButtonRenderer: ActionButtonRendererComponent
  };

  public themeClass: string = 'ag-theme-quartz-dark';

  public rowData: Appointment[] = [];

  constructor(private patientService: PatientService, private checkupService: CheckupService, private dialog: MatDialog
  ) {


  }

  openCheckupDialog(appointmentId: number) {
    this.checkupService.fetchCheckupsByIds(appointmentId).subscribe({
      next: (res) => {
        this.dialog.open(CheckupPopupGridComponent, {
          data: { checkups: res.data },
          width: '600px'
        });
      },
      error: (err) => {
        console.error('Error fetching checkups:', err);
      }
    });
  }

  ngOnInit(): void {
    this.patientService.fetchAppointments().subscribe({
      next: (res) => {
        this.rowData = res.data as Appointment[];
        if (this.gridApi) {
          this.gridApi.setGridOption('rowData', this.rowData);
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
    });
  }

  gridReady(event: GridReadyEvent) {
    this.gridApi = event.api;

  }
}
