import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';

@Injectable({
  providedIn: 'root'
})
export class DayAverageTemperatureService {
  private apiUrl = 'https://swissclimatewatch.thtech.ch/get_avg_temp_data.php';
  private standardStationData: StandardStationData[] = this.deepCopy(this.standardStationDataService.getStandardStationData());
  private dayAverageTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
  public dayAverageTemperature$ = this.dayAverageTemperatureSubject.asObservable();

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) {
    this.loadDayAverageTemperatures();
  }

  private deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }

  private loadDayAverageTemperatures(): void {
    timer(0, 600000).pipe( // Update every 10 minutes
      switchMap(() => this.fetchAndStoreDayAverageTemperatureData()),
      catchError(error => {
        console.error('Error fetching day average temperature data', error);
        return [];
      })
    ).subscribe(() => {
      console.log('Day average temperatures updated:', this.standardStationData);
    });
  }

  private fetchAndStoreDayAverageTemperatureData(): Observable<void> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(parsedData => {
        this.updateStationData(parsedData);
      }),
      switchMap(() => this.loadReferenceTemperatures()), // Load reference temperatures after updating average temperatures
      map(() => {}) // map to void
    );
  }

  private updateStationData(data: { city: string, avg_temp: string }[]): void {
    this.standardStationData.forEach(station => {
      const found = data.find(item => item.city === station.city);
      if (found) {
        station.currentTemp = parseFloat(parseFloat(found.avg_temp).toFixed(1));
      }
    });
  }

  private loadReferenceTemperatures(): Observable<void> {
    const currentMonth = this.getMonth();
    return this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).pipe(
      tap(referenceData => {
        this.standardStationData.forEach(station => {
          const ref = referenceData.find(r => r.city === station.city);
          if (ref) {
            station.refTemp = ref.referenceTemp.average;
          }
        });
        this.dayAverageTemperatureSubject.next(this.deepCopy(this.standardStationData));
      }),
      map(() => {}) // map to void
    );
  }

  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1;
  }
}
