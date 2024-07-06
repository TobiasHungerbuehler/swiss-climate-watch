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
import { DateNameService } from '../services/date-name.service';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.scss']
})
export class TableDisplayComponent implements OnInit, OnDestroy {
  // Observables für die aktuellen Temperaturdaten und die Tagesdurchschnittstemperaturen
  currentTemperatureData$: Observable<StandardStationData[]>;
  dayAverageTemperatureData$: Observable<StandardStationData[]>;
  // Array für die Monatsdurchschnittstemperaturen
  monthAverageTemperatureData: StandardStationData[] = [];
  // Anzeigemodus: 'current', 'dayAverage' oder 'monthAverage'
  public displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  // Liste der Abonnements zur Verwaltung der Speicherbereinigung
  private subscriptions: Subscription[] = [];
  // Observable für die sortierten Daten
  public sortedData$: Observable<StandardStationData[]> = of([]);
  // Variable zum Speichern des ausgewählten Monats
  public selectedMonth: { year: number, month: number } | null = null;

  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService,
    private dateNameService: DateNameService
  ) {
    // Initialisieren der Observables mit Fehlerbehandlung
    this.currentTemperatureData$ = this.currentTemperatureService.currentTemperature$.pipe(
      catchError(() => of([]))
    );
    this.dayAverageTemperatureData$ = this.dayAverageTemperatureService.dayAverageTemperature$.pipe(
      catchError(() => of([]))
    );
  }

  ngOnInit(): void {
    // Abonnieren des Anzeigemodus und Initialisieren der sortierten Daten
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.initializeSortedData();
      })
    );

    // Abonnieren der ausgewählten Monatsdaten und Speichern in der Variable
    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        this.selectedMonth = date;
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );

    // Initialisieren der sortierten Daten
    this.initializeSortedData();
  }

  // Initialisieren der sortierten Daten basierend auf dem aktuellen Anzeigemodus
  private initializeSortedData(): void {
    if (this.displayMode === 'monthAverage') {
      // Für den Monatsdurchschnittsmodus, direkte Zuweisung der Daten
      this.sortedData$ = of(this.sortDataByAnomaly(this.monthAverageTemperatureData));
    } else {
      // Für 'current' und 'dayAverage' Modi, Nutzung des DisplayModes zur Auswahl der entsprechenden Daten
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

  // Funktion zur Sortierung der Daten nach Anomalie (currentTemp - refTemp)
  private sortDataByAnomaly(data: StandardStationData[]): StandardStationData[] {
    return data.map(city => ({
      ...city,
      anomaly: city.currentTemp - (city.refTemp || 0)
    })).sort((a, b) => b.anomaly - a.anomaly);
  }

  // Setzen der Monatsdaten und Aktualisieren der Monatsdurchschnittsdaten
  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.updateMonthAverageData();
  }
  getMonthName(month: any){
    return this.dateNameService.getMonthName(month)
  }

  // Aktualisieren der Monatsdurchschnittsdaten und Initialisieren der sortierten Daten
  private updateMonthAverageData(): void {
    this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
    this.initializeSortedData();  // Reinitialize sorted data
  }

  // Aufräumen der Abonnements beim Zerstören der Komponente
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
