import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../shared/loader/loader.component";


@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    LoaderComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  @ViewChild('sidenav') sidenav!: MatSidenav;
  navToggle: boolean = true;

  toggleSideNav() {
    this.navToggle = !this.navToggle;
    console.log(this.navToggle);
    this.sidenav.toggle();
  }
}
