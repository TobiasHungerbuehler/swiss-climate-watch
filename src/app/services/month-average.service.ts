import { Injectable } from '@angular/core';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';
import { ReferenceDataService } from './reference-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthAverageService {
  private monthAverageData: StandardStationData[] = this.deepCopy(this.standardStationDataService.getStandardStationData());
  private tempMonthAverages: any[] = []; // Zwischenarray zum Speichern der heruntergeladenen Daten
  private availableDateList: { year: number, month: number }[] = []; // Liste der verfügbaren Daten

  private availableDateListSubject = new BehaviorSubject<{ year: number, month: number }[]>([]);
  public availableDateList$ = this.availableDateListSubject.asObservable();

  private monthAverageTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
  public monthAverageTemperature$ = this.monthAverageTemperatureSubject.asObservable();

  constructor(private standardStationDataService: StandardStationDataService, private referenceDataService: ReferenceDataService) {
    this.createMonthAverageJson();
  }

  private deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }

  createMonthAverageJson(): Promise<void> {
    return this.loadMonthData().then(() => {
      this.createAvailableDateList();
    });
  }

  private async loadMonthData(): Promise<void> {
    const promises = this.monthAverageData.map(async (station) => {
      const url = `https://data.geo.admin.ch/ch.meteoschweiz.klima/nbcn-homogen/homog_mo_${station.city}.txt`;
      try {
        const response = await fetch(url);
        const text = await response.text();
        const jsonData = this.parseData(text);

        // Füge die Daten in das Zwischenarray ein
        if (jsonData.length) {
          this.tempMonthAverages.push(...jsonData.map(item => ({ city: station.city, ...item })));
        }
      } catch (error) {
        console.error(`Error fetching data for city ${station.city}:`, error);
      }
    });

    await Promise.all(promises);
  }

  private parseData(data: string): any[] {
    const lines = data.split('\n');
    const parsedData = [];

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);

      if (parts.length === 4) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const temperature = parts[2] !== 'NA' ? parseFloat(parts[2]) : null;
        const precipitation = parts[3] !== 'NA' ? parseFloat(parts[3]) : null;

        if (year >= 2018) {
          parsedData.push({ year, month, temperature, precipitation });
        }
      }
    }
    return parsedData;
  }

  createAvailableDateList() {
    const dates = new Set<string>();

    // Überprüfe die erste Stadt im Array
    const firstCityData = this.tempMonthAverages.filter(item => item.city === this.tempMonthAverages[0].city);

    firstCityData.forEach(record => {
      const dateKey = `${record.year}-${record.month}`;
      if (!dates.has(dateKey) && record.year >= 2018) {
        dates.add(dateKey);
        this.availableDateList.push({ year: record.year, month: record.month });
      }
    });

    // Sortiere die Liste der verfügbaren Daten in absteigender Reihenfolge
    this.availableDateList.sort((a, b) => {
      if (a.year === b.year) {
        return b.month - a.month;
      }
      return b.year - a.year;
    });

    this.availableDateListSubject.next(this.availableDateList);
    this.monthTempToStaionData();
  }

  private monthTempToStaionData(year?: number, month?: number): void {
    if (!year || !month) {
      const latestDate = this.availableDateList[0];
      year = latestDate.year;
      month = latestDate.month;
    }

    this.monthAverageData.forEach(station => {
      const record = this.tempMonthAverages.find(item => item.city === station.city && item.year === year && item.month === month);
      if (record) {
        station.currentTemp = record.temperature !== null ? record.temperature : 0;
      }
    });

    this.refTempToStationData(month);
  }

  private refTempToStationData(currentMonth: number): void {
    this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).subscribe(referenceData => {
      this.monthAverageData.forEach(station => {
        const ref = referenceData.find(r => r.city === station.city);
        if (ref) {
          station.refTemp = ref.referenceTemp.average;
        }
      });
      this.monthAverageTemperatureSubject.next(this.deepCopy(this.monthAverageData));
    });
  }

  setMonthData(year: number, month: number): void {
    this.monthTempToStaionData(year, month);
  }

  getMonthAverageData(): StandardStationData[] {
    return this.deepCopy(this.monthAverageData);
  }
}
