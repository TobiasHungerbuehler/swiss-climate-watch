import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { MonthAverageService } from '../services/month-average.service';
import { DataDisplayService } from '../services/data-display.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { Observable, Subscription, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.scss']
})
export class TableDisplayComponent implements OnInit, OnDestroy {

  currentTemperatureData$: Observable<StandardStationData[]>;
  dayAverageTemperatureData$: Observable<StandardStationData[]>;
  monthAverageTemperatureData: StandardStationData[] = [];
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  private subscriptions: Subscription[] = [];
  public sortedData$: Observable<StandardStationData[]> = of([]);

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService
  ) {
    this.currentTemperatureData$ = this.currentTemperatureService.currentTemperature$.pipe(
      catchError(() => of([]))
    );
    this.dayAverageTemperatureData$ = this.dayAverageTemperatureService.dayAverageTemperature$.pipe(
      catchError(() => of([]))
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.initializeSortedData();
      })
    );

    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );

    this.initializeSortedData();
  }

  private initializeSortedData(): void {
    if (this.displayMode === 'monthAverage') {
      this.sortedData$ = of(this.sortDataByAnomaly(this.monthAverageTemperatureData));
    } else {
      this.sortedData$ = this.dataDisplayService.getDisplayMode().pipe(
        switchMap(mode => {
          if (mode === 'current') {
            return this.currentTemperatureData$.pipe(
              map(data => this.sortDataByAnomaly(data))
            );
          } else if (mode === 'dayAverage') {
            return this.dayAverageTemperatureData$.pipe(
              map(data => this.sortDataByAnomaly(data))
            );
          } else {
            return of(this.sortDataByAnomaly(this.monthAverageTemperatureData));
          }
        })
      );
    }
  }

  private sortDataByAnomaly(data: StandardStationData[]): StandardStationData[] {
    console.log('DATA',data);
    
    return data.map(city => ({
      ...city,
      anomaly: city.currentTemp - (city.refTemp || 0)
    })).sort((a, b) => b.anomaly - a.anomaly);
  }

  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.updateMonthAverageData();
  }

  private updateMonthAverageData(): void {
    this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
    this.initializeSortedData();  // Reinitialize sorted data
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
