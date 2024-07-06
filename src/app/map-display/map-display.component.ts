import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { DataDisplayService } from '../services/data-display.service';
import { Observable, Subscription, of } from 'rxjs';
import { MonthAverageService } from '../services/month-average.service';
import { TableComponent } from '../table/table.component';
import { catchError } from 'rxjs/operators';
import { DateNameService } from '../services/date-name.service';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, MapComponent, TableComponent],
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit, OnDestroy {

  currentTemperatureData$: Observable<StandardStationData[]>;
  dayAverageTemperatureData$: Observable<StandardStationData[]>;
  monthAverageTemperatureData: StandardStationData[] = [];
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  private subscriptions: Subscription[] = [];
  public selectedMonth: { year: number, month: number } | null = null;

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService,
    private dateNameService: DateNameService
  ) {
    this.currentTemperatureData$ = this.currentTemperatureService.currentTemperature$.pipe(
      catchError(() => of([]))
    );
    this.dayAverageTemperatureData$ = this.dayAverageTemperatureService.dayAverageTemperature$.pipe(
      catchError(() => of([]))
    );
  }

  ngOnInit(): void {
    // Abonniere den Anzeigemodus
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        if (mode === 'monthAverage') {
          this.updateMonthAverageData();
        }
      })
    );

    // Initialisiere die Monatsdurchschnittsdaten und aktualisiere die Karte, wenn der Modus 'monthAverage' ist
    this.monthAverageService.createMonthAverageJson().then(() => {
      if (this.displayMode === 'monthAverage') {
        this.updateMonthAverageData();
      }
    });

    // Abonniere die ausgewählten Monat-Daten
    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        this.selectedMonth = date;
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );
  }

  // Setzt die Monat-Daten und aktualisiert die Kartendarstellung
  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.updateMonthAverageData();
  }

  // Aktualisiert die Monatsdurchschnittsdaten
  private updateMonthAverageData(): void {
    this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
  }

  public getMonthName(month: any): string {
    return this.dateNameService.getMonthName(month);
  }

  // Aufräumen der Abonnements beim Zerstören der Komponente
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
