import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentTemperatureService {
  private currentTempData: StandardStationData[] = [];

  constructor(
    private http: HttpClient,
    private standardStationDataService: StandardStationDataService,
    private referenceDataService: ReferenceDataService
  ) { }

  loadCurrentTemperatures(): void {
    const csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
    this.http.get(csvUrl, { responseType: 'text' })
      .pipe(
        map(response => this.parseCSV(response))
      )
      .subscribe(parsedData => {
        this.updateStationData(parsedData);
      });
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
    const standardStationData = this.standardStationDataService.getStandardStationData();
    data.forEach(item => {
      const station = standardStationData.find(station => station.city === item.Stadt);
      if (station) {
        station.currentTemp = parseFloat(parseFloat(item.Temperatur).toFixed(1));
      }
    });
    this.currentTempData = standardStationData;
  }

  getCurrentTemperatures(): StandardStationData[] {
    return this.currentTempData;
  }
}
