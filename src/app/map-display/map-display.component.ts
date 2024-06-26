import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { DataDisplayService } from '../services/data-display.service';
import { Subscription } from 'rxjs';
import { MonthAverageService } from '../services/month-average.service';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit, OnDestroy {

  currentTempData: StandardStationData[] = [];
  dayAverageData: StandardStationData[] = [];
  monthAverageData: StandardStationData[] = [];

  mapDisplayData: StandardStationData[] = [];
  private subscriptions: Subscription[] = [];
  private displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.currentTemperatureService.currentTemperature$.subscribe((data: StandardStationData[]) => {
        this.currentTempData = data;
        this.updateMapDisplayData(this.displayMode);
      })
    );

    this.subscriptions.push(
      this.dayAverageTemperatureService.dayAverageTemperature$.subscribe((data: StandardStationData[]) => {
        this.dayAverageData = data;
        this.updateMapDisplayData(this.displayMode);
        //console.log('DAY AVERAGE', this.dayAverageData);
      })
    );

    this.subscriptions.push(
      this.monthAverageService.monthAverageTemperature$.subscribe((data: StandardStationData[]) => {
        this.monthAverageData = data;
        this.updateMapDisplayData(this.displayMode);
        //console.log('MONTH DATA', this.monthAverageData);
      })
    );

    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.updateMapDisplayData(this.displayMode);
      })
    );
  }

  private updateMapDisplayData(mode: 'current' | 'dayAverage' | 'monthAverage'): void {
    if (mode === 'current') {
      this.mapDisplayData = this.currentTempData;
      //console.log('current:', this.mapDisplayData);
    } else if (mode === 'dayAverage') {
      this.mapDisplayData = this.dayAverageData;
      //console.log('day average:', this.mapDisplayData);
    } else if (mode === 'monthAverage') {
      this.mapDisplayData = this.monthAverageData;
      //console.log('month average:', this.mapDisplayData);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
