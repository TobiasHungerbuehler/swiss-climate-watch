import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardToggleServiceService } from '../services/dashboard-toggle-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-toggle.component.html',
  styleUrl: './dashboard-toggle.component.scss'
})
export class DashboardToggleComponent {
  public dashboardMode: 'map' | 'table' = 'map';
  private subscriptions: Subscription[] = [];

  constructor(private dashboardToggleService: DashboardToggleServiceService) {

  }

  ngOnInit(): void {
    
        // Abonniere den Dashboardmodus
        this.subscriptions.push(
          this.dashboardToggleService.getDashboardMode().subscribe(mode => {
            this.dashboardMode = mode;
          })
        );
  }



  // Setzt den Modus
  setMode(mode: 'table' | 'map'): void {
    this.dashboardToggleService.setDashboardMode(mode);
  }



}
