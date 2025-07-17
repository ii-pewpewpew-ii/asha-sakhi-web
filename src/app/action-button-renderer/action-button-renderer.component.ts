import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CheckupService } from '../shared/checkup.service';
import { CellClickedEvent } from 'ag-grid-community';
import { SakhiApiResponse } from '../shared/shared';


@Component({
  selector: 'app-action-button-renderer',
  standalone: true,
  imports: [MatButtonModule],
  template: `
  <button mat-flat-button style="background-color: rgb(243, 255, 243); color: #1c1c1c; font-weight: 500; font-size: 12px; padding: 2px 8px; min-height: 20px; line-height: 1;" (click)="onClick()">
  Send Reminder
</button>

  `
})
export class ActionButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private checkupService: CheckupService) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onClick(): void {
    const appointmentId = this.params.data.appointmentId;
    console.log(appointmentId);
    this.checkupService.sendReminderForAppointment(appointmentId).subscribe({
      next: (res: SakhiApiResponse<{ reminderSent: boolean }>) => {
        if (res.data.reminderSent === true) {
          console.log('Reminder sent successfully.');
        } else {
          console.warn('Reminder could not be sent.');
        }
      },
      error: (error) => {
        console.error('Error sending reminder:', error);
      }
    });
  }
}
