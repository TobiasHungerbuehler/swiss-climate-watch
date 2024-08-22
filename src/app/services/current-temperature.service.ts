import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentTemperatureService {
  private csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
  private currentTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
  public currentTemperature$ = this.currentTemperatureSubject.asObservable();
  private currentTempData: StandardStationData[] = [];

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) {
    this.currentTempData = this.standardStationDataService.getStandardStationData().map(data => ({ ...data }));
    this.loadCurrentTemperatures();
  }

  private loadCurrentTemperatures(): void {
    timer(500, 60000) // 0ms delay, then every 1 minute (60000ms)
      .pipe(
        switchMap(() => this.fetchAndStoreTemperatureData()),
        catchError(error => {
          console.error('Error fetching temperature data', error);
          return [];
        })
      )
      .subscribe(() => {
        //console.log('Updated current temperature data:', this.currentTempData);
      });
  }

  private fetchAndStoreTemperatureData(): Observable<void> {
    return this.http.get(this.csvUrl, { responseType: 'text' })
      .pipe(
        map(response => this.parseCSV(response)),
        tap(parsedData => this.updateStationData(parsedData)),
        switchMap(() => this.loadReferenceTemperatures()), // Lade die Referenztemperaturen nach dem Aktualisieren der aktuellen Temperaturen
        map(() => {}) // map to void
      );
  }

  private parseCSV(data: string): { Stadt: string, Temperatur: string }[] {
    const rows = data.split('\n').slice(1);
    return rows.map(row => {
      const columns = row.split(';');
      return {
        Stadt: columns[1]?.replace(/"/g, ''),
        Temperatur: columns[3]?.replace(/"/g, '')
      };
    }).filter(row => row.Stadt && row.Temperatur);
  }

  private updateStationData(data: { Stadt: string, Temperatur: string }[]): void {
    data.forEach(item => {
      const station = this.currentTempData.find(station => station.city === item.Stadt);
      if (station) {
        station.currentTemp = parseFloat(parseFloat(item.Temperatur).toFixed(1));
      }
    });
    this.currentTemperatureSubject.next(this.currentTempData);
  }

  // Lade die Referenztemperaturen von Firebase
  private loadReferenceTemperatures(): Observable<void> {
    const currentMonth = this.getMonth(); // Konvertiere die Monatszahl in einen String
    return this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).pipe(
      tap(referenceData => {
        this.currentTempData.forEach(station => {
          const ref = referenceData.find(r => r.city === station.city);
          if (ref) {
            station.refTemp = ref.referenceTemp.average;
            station.month = ref.refAverageMonth;
            station.highestRefTemp = ref.referenceTemp.highest;
            station.highestRefTempDate = ref.referenceTemp.highest_date;

          }
        });
        this.currentTemperatureSubject.next(this.currentTempData);
        //console.log('im current service',this.currentTempData);

        
      }),
      map(() => {}) // map to void
    );
  }

  // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
  }
}
