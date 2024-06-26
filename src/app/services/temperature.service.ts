import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export interface CurrentTemp {
  city: string;
  currentTemp: number;
}

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
  private currentTempSubject = new BehaviorSubject<CurrentTemp[]>([]);

  constructor(private http: HttpClient) {
    this.startAutoRefresh();
  }

  private startAutoRefresh(): void {
    timer(0, 300000) // 0ms delay, then every 5 minutes (300000ms)
      .pipe(
        switchMap(() => this.fetchAndStoreTemperatureData()),
        catchError(error => {
          console.error('Error fetching temperature data', error);
          return [];
        })
      )
      .subscribe(temps => this.currentTempSubject.next(temps));
  }

  private fetchAndStoreTemperatureData(): Observable<CurrentTemp[]> {
    return this.http.get(this.csvUrl, { responseType: 'arraybuffer' })
      .pipe(
        map(response => this.parseCSV(response)),
        map(parsedData => this.mapTemperatures(parsedData)),
        //tap(currentTemps => console.log('new current temps',currentTemps)) // log the temperatures for debugging
      );
  }

  private parseCSV(data: ArrayBuffer): { Stadt: string, Temperatur: string }[] {
    const textDecoder = new TextDecoder('iso-8859-1');
    const csvData = textDecoder.decode(data);
    const rows = csvData.split('\n').slice(1);
    return rows.map(row => {
      const columns = row.split(';');
      return {
        Stadt: columns[1]?.replace(/"/g, ''),
        Temperatur: columns[3]?.replace(/"/g, '')
      };
    }).filter(row => row.Stadt && row.Temperatur);
  }

  private mapTemperatures(data: { Stadt: string, Temperatur: string }[]): CurrentTemp[] {
    return data.map(item => ({
      city: item.Stadt,
      currentTemp: parseFloat(item.Temperatur)
    }));
  }

  public getCurrentTempObservable(): Observable<CurrentTemp[]> {
    return this.currentTempSubject.asObservable();
  }
}
