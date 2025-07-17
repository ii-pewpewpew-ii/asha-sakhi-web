import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-action-cell-renderer',
  imports: [MatFormFieldModule, MatSelectModule, MatIconModule, MatToolbarModule, MatMenuModule, MatButtonModule],
  template: `
    <mat-toolbar class="action-toolbar">
      <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Actions" class="white-bg-icon black-icon">
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="onViewClick()">
        <mat-icon>visibility</mat-icon>
        <span>View Patient</span>
      </button>
    </mat-menu>
  `,
  styles: [`
  .black-icon {
  color: black !important;
}
   .mat-icon {
      transform: scale(0.7)
   }
   .action-toolbar {
      padding: 0;
      min-height: auto;
      background: transparent;
      background-color: rgb(243, 255, 243) !important;
    }
    .white-bg-icon {
      background-color: rgb(243, 255, 243) !important;
      border-radius: 50%;
      padding: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onViewClick(): void {
    const patientId = this.params.data.patientId;
    console.log(patientId)
    this.router.navigate(['/dashboard/patient'], { queryParams: { patientId: patientId } });
  }
}
