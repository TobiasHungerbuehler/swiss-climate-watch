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
  private displayMode: 'current' | 'dayAverage' = 'current';

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
      })
    );

    this.monthAverageService.createMonthAverageJson().then(() => {
      this.monthAverageData = this.monthAverageService.getMonthAverageData();
      this.updateMapDisplayData(this.displayMode);
    });

    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.updateMapDisplayData(this.displayMode);
      })
    );

    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );
  }

  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.monthAverageData = this.monthAverageService.getMonthAverageData();
    this.updateMapDisplayData();
    console.log('Month data after setting to', year, month, ':', this.monthAverageData);
  }

  private updateMapDisplayData(mode?: 'current' | 'dayAverage'): void {
    if (mode === 'current') {
      this.mapDisplayData = this.currentTempData;
    } else if (mode === 'dayAverage') {
      this.mapDisplayData = this.dayAverageData;
    } else {
      this.mapDisplayData = this.monthAverageData;
    }
    //console.log(${this.displayMode}:, this.mapDisplayData);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}