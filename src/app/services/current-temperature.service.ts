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
  private standardStationData: StandardStationData[] = this.standardStationDataService.getStandardStationData();
  private currentTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
  public currentTemperature$ = this.currentTemperatureSubject.asObservable();
  private currentTemperatureData: StandardStationData[] = [];

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) {
    this.initializeCurrentTemperatureData();
    this.loadCurrentTemperatures();
  }

  private initializeCurrentTemperatureData(): void {
    this.currentTemperatureData = this.standardStationData.map(station => ({
      ...station,
      temp: 0,
      refAverageTemp: 0
    }));
  }

  private loadCurrentTemperatures(): void {
    timer(0, 60000) // 0ms delay, then every 1 minute (60000ms)
      .pipe(
        switchMap(() => this.fetchAndStoreTemperatureData()),
        catchError(error => {
          console.error('Error fetching temperature data', error);
          return [];
        })
      )
      .subscribe(() => {
        this.loadReferenceTemperatures();
        this.currentTemperatureSubject.next(this.currentTemperatureData);
        //console.log('Updated current temperature data:', this.currentTemperatureData);
      });
  }

  private fetchAndStoreTemperatureData(): Observable<void> {
    return this.http.get(this.csvUrl, { responseType: 'text' })
      .pipe(
        map(response => this.parseCSV(response)),
        tap(parsedData => this.updateStationData(parsedData)),
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
      const station = this.currentTemperatureData.find(station => station.city === item.Stadt);
      if (station) {
        station.temp = parseFloat(parseFloat(item.Temperatur).toFixed(1));
      }
    });
  }

  // Lade die Referenztemperaturen von Firebase
  private loadReferenceTemperatures(): void {
    const currentMonth = this.getMonth(); // Konvertiere die Monatszahl in einen String
    this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).subscribe(referenceData => {
      this.currentTemperatureData.forEach(station => {
        const ref = referenceData.find(r => r.city === station.city);
        if (ref) {
          station.refAverageTemp = ref.referenceTemp.average;
        }
      });
      this.currentTemperatureSubject.next(this.currentTemperatureData);
    });
  }

  // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
  }
}
