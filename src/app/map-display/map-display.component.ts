import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { DataDisplayService } from '../services/data-display.service';
import { Observable, Subscription } from 'rxjs';
import { MonthAverageService } from '../services/month-average.service';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit, OnDestroy {

  // Array to hold the data to be displayed on the map
  mapDisplayData: StandardStationData[] = [];
  private subscriptions: Subscription[] = []; // Subscriptions for observables
  private displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current'; // Display mode
  private serviceSubscription: Subscription | null = null; // Subscription for the selected data service

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService
  ) { }

  ngOnInit(): void {
    // Subscribe to the display mode observable
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.updateMapDisplayData(this.displayMode);
      })
    );

    // Initialize month average data and update the map if the display mode is monthAverage
    this.monthAverageService.createMonthAverageJson().then(() => {
      if (this.displayMode === 'monthAverage') {
        this.updateMapDisplayData('monthAverage');
      }
    });

    // Subscribe to the month data selected observable
    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );
  }

  // Set the month data and update the map display
  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.mapDisplayData = this.monthAverageService.getMonthAverageData();
    this.displayMode = 'monthAverage';
    this.updateMapDisplayData('monthAverage');
    console.log('Month data after setting to', year, month, ':', this.mapDisplayData);
  }

  // Update the map display data based on the selected mode
  private updateMapDisplayData(mode: 'current' | 'dayAverage' | 'monthAverage'): void {
    // Unsubscribe from any existing service subscription to avoid multiple subscriptions
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    // Subscribe to the appropriate data service based on the display mode
    if (mode === 'current') {
      this.subscribeToService(this.currentTemperatureService.currentTemperature$);
    } else if (mode === 'dayAverage') {
      this.subscribeToService(this.dayAverageTemperatureService.dayAverageTemperature$);
    } else if (mode === 'monthAverage') {
      this.mapDisplayData = this.monthAverageService.getMonthAverageData();
      console.log(`Data for ${mode}:`, this.mapDisplayData);
    }
  }

  // Subscribe to a data service and update the map display data
  private subscribeToService(source: Observable<StandardStationData[]>): void {
    this.serviceSubscription = source.subscribe((data: StandardStationData[]) => {
      this.mapDisplayData = data;
      console.log(`Data for ${this.displayMode}:`, this.mapDisplayData);
    });
  }

  // Clean up subscriptions when the component is destroyed
  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
