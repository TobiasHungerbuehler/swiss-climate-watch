import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayAverageTemperatureService {
  private dayAverageData: StandardStationData[] = [];

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) { }

  loadDayAverageTemperatures(): void {
    const apiUrl = 'https://swissclimatewatch.thtech.ch/get_avg_temp_data.php';
    this.http.get<any[]>(apiUrl)
      .pipe(
        map(response => this.updateStationData(response))
      )
      .subscribe();
  }

  private updateStationData(data: { city: string, avg_temp: string }[]): void {
    const standardStationData = this.standardStationDataService.getStandardStationData();
    data.forEach(item => {
      const station = standardStationData.find(station => station.city === item.city);
      if (station) {
        station.currentTemp = parseFloat(parseFloat(item.avg_temp).toFixed(1));
      }
    });
    this.dayAverageData = standardStationData;
  }

  getDayAverageTemperatures(): StandardStationData[] {
    return this.dayAverageData;
  }
}
