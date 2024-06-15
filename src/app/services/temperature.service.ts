import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, BehaviorSubject } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
  private temperatures: { [city: string]: string } = {};
  private temperatureSubject = new BehaviorSubject<{ [city: string]: string }>({});

  constructor(private http: HttpClient) {
    this.fetchTemperatureData().subscribe(data => {
      console.log('Initial data:', data); // Log initial data
      this.temperatures = this.mapTemperatures(data);
      this.temperatureSubject.next(this.temperatures);
      this.startFetchingTemperatureData();
    });
  }

  private startFetchingTemperatureData(): void {
    interval(300000) // 300000ms = 5 Minuten
      .pipe(
        switchMap(() => this.fetchTemperatureData()),
        tap(data => {
          this.temperatures = this.mapTemperatures(data);
          this.temperatureSubject.next(this.temperatures);
        })
      )
      .subscribe();
  }

  private fetchTemperatureData(): Observable<{ Stadt: string, Temperatur: string }[]> {
    return this.http.get(this.csvUrl, { responseType: 'arraybuffer' }).pipe(
      map(response => {
        const textDecoder = new TextDecoder('iso-8859-1');
        const csvData = textDecoder.decode(response);
        return this.parseCSV(csvData);
      })
    );
  }

  private parseCSV(data: string): { Stadt: string, Temperatur: string }[] {
    const rows = data.split('\n').slice(1);
    return rows.map(row => {
      const columns = row.split(';');
      return {
        Stadt: columns[0]?.replace(/"/g, ''),
        Temperatur: columns[3]?.replace(/"/g, '')
      };
    }).filter(row => row.Stadt && row.Temperatur);
  }

  private mapTemperatures(data: { Stadt: string, Temperatur: string }[]): { [city: string]: string } {
    const temperatureMap: { [city: string]: string } = {};
    data.forEach(item => {
      temperatureMap[item.Stadt] = item.Temperatur;
    });
    return temperatureMap;
  }

  public getTemperatureObservable(): Observable<{ [city: string]: string }> {
    return this.temperatureSubject.asObservable();
  }
}
