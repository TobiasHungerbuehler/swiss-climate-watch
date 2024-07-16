import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardToggleServiceService } from '../services/dashboard-toggle-service.service';

@Component({
  selector: 'app-dashboard-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-toggle.component.html',
  styleUrl: './dashboard-toggle.component.scss'
})
export class DashboardToggleComponent {

  constructor(private dashboardToggleService: DashboardToggleServiceService){

  }

    // Setzt den Modus auf 'current' oder 'dayAverage'
    setMode(mode: 'table' | 'map'): void {
      this.dashboardToggleService.setDashboardMode(mode);
    }

}
