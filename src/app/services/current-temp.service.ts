import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BasicStationDataService } from './basic-station-data.service';

export interface CurrentTemp {
  city: string;
  currentTemp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentTempService {
  private csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
  private currentStationDataSubject = new BehaviorSubject<any[]>(this.basicStationDataService.getBasicStationData());
  public currentStationData$ = this.currentStationDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private basicStationDataService: BasicStationDataService
  ) {
    this.startAutoRefresh();
  }

  private startAutoRefresh(): void {
    timer(0, 60000) // 0ms delay, dann alle 1 Minute (60000ms)
      .pipe(
        switchMap(() => this.fetchAndStoreTemperatureData()),
        catchError(error => {
          console.error('Error fetching temperature data', error);
          return [];
        })
      )
      .subscribe(() => this.logUpdatedData());
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
    const currentData = this.currentStationDataSubject.value;
    data.forEach(item => {
      const station = currentData.find(station => station.city === item.Stadt);
      if (station) {
        station.currentTemp = parseFloat(item.Temperatur);
      }
    });
    this.currentStationDataSubject.next(currentData); // Update the BehaviorSubject with the new data
  }

  private logUpdatedData(): void {
    console.log('Updated current data:', this.currentStationDataSubject.value);
  }
}
