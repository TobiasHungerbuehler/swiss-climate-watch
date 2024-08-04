import { Component, OnInit } from '@angular/core';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { MapComponent } from '../map-display/map/map.component';
import { TempDisplaysComponent } from '../temp-displays/temp-displays.component';
import { DataDisplayService } from '../services/data-display.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MapDashboardComponent } from '../map-dashboard/map-dashboard.component';
import { TableDashboardComponent } from '../table-dashboard/table-dashboard.component';
import { DashboardToggleComponent } from '../dashboard-toggle/dashboard-toggle.component';
import { DashboardToggleServiceService } from '../services/dashboard-toggle-service.service';
import { StartComponent } from '../start/start.component';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule ,DataToggleComponent,MapComponent, TempDisplaysComponent, MapDashboardComponent, TableDashboardComponent, DashboardToggleComponent, StartComponent, OnboardingComponent, DashboardComponent], 
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  public dashboardMode: 'map' | 'table' = 'map';
  private subscriptions: Subscription[] = [];


  constructor(private dataDisplayService: DataDisplayService, private dashboardToggleService: DashboardToggleServiceService) { 
    
  }
  
  ngOnInit(): void {
    
    // Abonniere den Anzeigemodus
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
            })
          );

    // Abonniere den Dashboardmodus
    this.subscriptions.push(
      this.dashboardToggleService.getDashboardMode().subscribe(mode => {
        this.dashboardMode = mode;
            })
          );

  }

  



}
