import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from '../map-display/map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { DataDisplayService } from '../services/data-display.service';
import { Observable, Subscription, of } from 'rxjs';
import { MonthAverageService } from '../services/month-average.service';
import { TableComponent } from '../table/table.component';
import { catchError, tap } from 'rxjs/operators';
import { DateNameService } from '../services/date-name.service';
import { DateTimeService } from '../services/date-time.service';
import { HighestRefListComponent } from '../shared/highest-ref-list/highest-ref-list.component';
import { DashboardToggleServiceService } from '../services/dashboard-toggle-service.service';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { DateboxComponent } from './datebox/datebox.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MapComponent, TableComponent, HighestRefListComponent, OnboardingComponent, DateboxComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentTemperatureData$: Observable<StandardStationData[]>;
  dayAverageTemperatureData$: Observable<StandardStationData[]>;
  monthAverageTemperatureData: StandardStationData[] = [];
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  private subscriptions: Subscription[] = [];
  public selectedMonth: { year: number, month: number } | null = null;
  public dashboardMode: 'map' | 'table' = 'map';

  currentTime: string = '';
  currentDate: string = '';
  previousDate: string = '';
  actualMonth: number = 0;
  mapDisplayData: StandardStationData[] = [];

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService,
    private dateNameService: DateNameService,
    private dateTimeService: DateTimeService,
    private dashboardToggleService: DashboardToggleServiceService
  ) {
    this.currentTemperatureData$ = this.currentTemperatureService.currentTemperature$.pipe(
      //tap(data => console.log('Current Temperature Data:', data)),
      catchError(() => of([]))
    );

    this.dayAverageTemperatureData$ = this.dayAverageTemperatureService.dayAverageTemperature$.pipe(
      //tap(data => console.log('Day Average Temperature Data:', data)),
      catchError(() => of([]))
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        //console.log('Display Mode:', mode);
        this.updateSelectedData();
        if (mode === 'monthAverage') {
          this.updateMonthAverageData();
        }
      })
    );

    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        this.selectedMonth = date;
        if (date) {
          //console.log('Selected Month:', date);
          this.setMonthData(date.year, date.month);
        }
      })
    );

      // Abonniere den Dashboardmodus
      this.subscriptions.push(
        this.dashboardToggleService.getDashboardMode().subscribe(mode => {
          this.dashboardMode = mode;
              })
            );

    this.subscriptions.push(
      this.dateTimeService.getCurrentTime().subscribe(time => this.currentTime = time),
      this.dateTimeService.getCurrentDate().subscribe(date => this.currentDate = date),
      this.dateTimeService.getPreviousDate().subscribe(prevDate => this.previousDate = prevDate)
    );

    this.updateSelectedData();
  }

  updateSelectedData(): void {
    console.log('Updating selected data for mode:', this.displayMode);
    if (this.displayMode === 'current') {
      this.currentTemperatureData$.subscribe(data => {
        this.mapDisplayData = data;
        //console.log('Selected Data (Current):', this.selectedData);
      });
    } else if (this.displayMode === 'dayAverage') {
      this.dayAverageTemperatureData$.subscribe(data => {
        this.mapDisplayData = data;
        //console.log('Selected Data (Day Average):', this.selectedData);
      });
    } else if (this.displayMode === 'monthAverage') {
      this.mapDisplayData = this.monthAverageTemperatureData;
      //console.log('Selected Data (Month Average):', this.selectedData);
    }
  }

  setMonthData(year: number, month: number): void {
    console.log('Setting month data:', year, month);
    this.monthAverageService.setMonthData(year, month);
    this.updateMonthAverageData();
  }

  private updateMonthAverageData(): void {
    console.log('Updating month average data');
    this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
  }

  public getMonthName(month: any): string {
    return this.dateNameService.getMonthName(month);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1;
  }
}
