import { Injectable } from '@angular/core';
import { StandardStationDataService, StandardStationData } from './standard-station-data.service';

@Injectable({
  providedIn: 'root'
})
export class MonthAverageService {
  private standardStationData: StandardStationData[] = this.standardStationDataService.getStandardStationData();

  monthAverages: StandardStationData[] = [];
  lastMonthRecord: { city: string, year: number | null, month: number | null, monthAverageTemp: number | null }[] = [];

  constructor(private standardStationDataService: StandardStationDataService) {
    this.createMonthAverageJson();
  }

  createMonthAverageJson() {
    this.monthAverages = this.standardStationData.map(station => ({
      ...station,
      monthAverages: []
    }));
    console.log('MONTH AVERAGE', this.monthAverages);
    this.loadMonthData();
  }
  
  async loadMonthData() {
    for (let index = 0; index < this.monthAverages.length; index++) {
      const station = this.monthAverages[index];
      const url = `https://data.geo.admin.ch/ch.meteoschweiz.klima/nbcn-homogen/homog_mo_${station.city}.txt`;
      try {
        const response = await fetch(url);
        const text = await response.text();
        const jsonData = this.parseData(text);
        
        // Füge die Daten in das monthAverages-Array ein
        if (jsonData.length) {
          station.monthAverages!.push(...jsonData);
        }
        
        //console.log(`Data for city ${station.city}:`, jsonData);
      } catch (error) {
        console.error(`Error fetching data for city ${station.city}:`, error);
      }
      console.log(`Data for city`, this.monthAverages);
    }
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

        if (year >= 1940) {
          parsedData.push({ year, month, temperature, precipitation });
        }
      }
    }
    return parsedData;
  }

  getLastRecord() {
    this.lastMonthRecord = this.monthAverages.map(station => {
      const lastEntry = station.monthAverages!.length > 0 ? station.monthAverages![station.monthAverages!.length - 1] : null;
      return {
        city: station.city,
        year: lastEntry ? lastEntry.year : null,
        month: lastEntry ? lastEntry.month : null,
        monthAverageTemp: lastEntry ? lastEntry.temperature : null
      };
    });
    console.log('last month record',this.lastMonthRecord);
    
    return this.lastMonthRecord;
  }
}
