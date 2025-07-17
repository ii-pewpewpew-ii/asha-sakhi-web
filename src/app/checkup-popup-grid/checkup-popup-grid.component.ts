import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-checkup-popup-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Checkups for Appointment</h2>
    <div class="ag-theme-quartz-dark" style="width: 100%; height: 300px;">
      <ag-grid-angular
        [rowData]="data.checkups"
        [columnDefs]="columnDefs"
        class="ag-theme-quartz-dark">
      </ag-grid-angular>
    </div>
  `,
})
export class CheckupPopupGridComponent {
  columnDefs: ColDef[] = [
    { headerName: 'Checkup ID', field: 'checkupId' },
    { headerName: 'Date', field: 'checkupDate' },
    { headerName: 'Notes', field: 'notes' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { checkups: any[] }) {}
}