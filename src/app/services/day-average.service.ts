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

  private loadDayAverageTemperatures(): void {
    timer(0, 600000) // 0ms delay, then every 10 minutes (600000ms)
      .pipe(
        switchMap(() => this.fetchAndStoreDayAverageTemperatureData()),
        catchError(error => {
          console.error('Error fetching day average temperature data', error);
          return [];
        })
      )
      .subscribe(() => {
        console.log('Day average temperatures updated:', this.standardStationData);
      });
  }

  private fetchAndStoreDayAverageTemperatureData(): Observable<void> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        tap(parsedData => {
          console.log('Fetched day average data:', parsedData);
          this.updateStationData(parsedData);
        }),
        switchMap(() => this.loadReferenceTemperatures()), // Lade die Referenztemperaturen nach dem Aktualisieren der durchschnittlichen Temperaturen
        map(() => {}) // map to void
      );
  }

  private updateStationData(data: { city: string, avg_temp: string }[]): void {
    this.standardStationData.forEach(station => {
      const found = data.find(item => item.city === station.city);
      if (found) {
        station.currentTemp = parseFloat(parseFloat(found.avg_temp).toFixed(1));
        console.log(`Updated station ${station.city} with average temperature: ${station.currentTemp}`);
      } else {
        console.warn(`Station ${station.city} not found in fetched day average data`);
      }
    });
    console.log('------------------------------------', this.standardStationData);
  }

  // Lade die Referenztemperaturen von Firebase
  private loadReferenceTemperatures(): Observable<void> {
    const currentMonth = this.getMonth(); // Konvertiere die Monatszahl in einen String
    return this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).pipe(
      tap(referenceData => {
        console.log('Fetched reference data:', referenceData);
        this.standardStationData.forEach(station => {
          const ref = referenceData.find(r => r.city === station.city);
          if (ref) {
            station.refTemp = ref.referenceTemp.average;
            console.log(`Updated station ${station.city} with reference temperature: ${station.refTemp}`);
          } else {
            console.warn(`Reference data for station ${station.city} not found`);
          }
        });
        this.dayAverageTemperatureSubject.next(this.deepCopy(this.standardStationData));
        console.log('Day average temperature data with reference temperatures:', this.standardStationData);
      }),
      map(() => {}) // map to void
    );
  }

  // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
  }

  // Helper function for deep copying
  private deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
}
