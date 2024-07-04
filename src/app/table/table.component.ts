import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StandardStationData } from '../services/standard-station-data.service';
import { Subscription } from 'rxjs';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  citys: any[] = [];
  private subscription: Subscription | null = null;

  constructor(private mapDisplayComponent: MapDisplayComponent) {}

  ngOnInit() {
    this.subscription = this.mapDisplayComponent.mapDisplayData$.subscribe(data => {
      this.updateCityData(data);
    });
  }

  private updateCityData(mapDisplayData: StandardStationData[]): void {
    this.citys = mapDisplayData.map(city => ({
      ...city,
      anomaly: city.currentTemp - (city.refTemp || 0)
    }));
    this.sortCitysByAnomalie();
  }

  private sortCitysByAnomalie(): void {
    this.citys.sort((a, b) => b.anomaly - a.anomaly);
    console.log('Sorted city data by anomaly:', this.citys);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
