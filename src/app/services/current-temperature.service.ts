import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentTemperatureService {
  private apiUrl = 'https://swissclimatewatch.thtech.ch/get_current_temp_data.php';
  private standardStationData: StandardStationData[] = this.deepCopy(this.standardStationDataService.getStandardStationData());
  private currentTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
  public currentTemperature$ = this.currentTemperatureSubject.asObservable();

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) {
    this.loadCurrentTemperatures();
  }

  private deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }

  private loadCurrentTemperatures(): void {
    timer(0, 60000).pipe( // Update every minute
      switchMap(() => this.fetchAndStoreCurrentTemperatureData()),
      catchError(error => {
        console.error('Error fetching current temperature data', error);
        return [];
      })
    ).subscribe(() => {
      console.log('Current temperatures updated:', this.standardStationData);
    });
  }

  private fetchAndStoreCurrentTemperatureData(): Observable<void> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(parsedData => {
        this.updateStationData(parsedData);
      }),
      switchMap(() => this.loadReferenceTemperatures()), // Load reference temperatures after updating current temperatures
      map(() => {}) // map to void
    );
  }

  private updateStationData(data: { city: string, temp: string }[]): void {
    this.standardStationData.forEach(station => {
      const found = data.find(item => item.city === station.city);
      if (found) {
        station.currentTemp = parseFloat(parseFloat(found.temp).toFixed(1));
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
        this.currentTemperatureSubject.next(this.deepCopy(this.standardStationData));
      }),
      map(() => {}) // map to void
    );
  }

  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1;
  }
}
