import { Component, OnInit } from '@angular/core';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { MapComponent } from '../map-display/map/map.component';
import { TempDisplaysComponent } from '../temp-displays/temp-displays.component';
import { DataDisplayService } from '../services/data-display.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MapDashboardComponent } from '../map-dashboard/map-dashboard.component';
import { TableDashboardComponent } from '../table-dashboard/table-dashboard.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule ,DataToggleComponent,MapComponent, TempDisplaysComponent, MapDashboardComponent, TableDashboardComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  private subscriptions: Subscription[] = [];


  constructor(private dataDisplayService: DataDisplayService) { 
    
  }
  
  ngOnInit(): void {
    
    // Abonniere den Anzeigemodus
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        //console.log('toggle',this.displayMode);
            })
          );

  }
}
