import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StandardStationData } from '../services/standard-station-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() mapDisplayData: StandardStationData[] = [];
  citys: any[] = [];
  updateCounter: number = 0; // Counter to track update attempts

  constructor() {}

  ngOnInit() {
    this.updateCityData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapDisplayData'] && this.mapDisplayData.length > 0) {
      this.updateCityData();
    }
  }

  private updateCityData(): void {
    // Erstelle ein neues Array von Städten
    this.citys = this.mapDisplayData.map(city => {
      // Berechne die Anomalie für jede Stadt
      const anomaly = city.currentTemp - (city.refTemp || 0);
      // Rückgabe eines neuen Objekts mit den erforderlichen Daten und der berechneten Anomalie
      return {
        cityName: city.cityName,
        city: city.city,
        currentTemp: city.currentTemp,
        refTemp: city.refTemp,
        anomaly: anomaly
      };
    });

    // Check if refTemp values are present, if not, retry update
    const refTempMissing = this.citys.some(city => city.refTemp === 0 && this.updateCounter < 5);
    if (refTempMissing) {
      this.updateCounter++;
      setTimeout(() => this.updateCityData(), ); // Retry after 1 second
    } else {
      this.updateCounter = 0; // Reset counter if refTemp values are present
      this.sortCitysByAnomalie();
      console.log('Updated city data:', this.citys);
    }
  }

  private sortCitysByAnomalie(): void {
    this.citys.sort((a, b) => b.anomaly - a.anomaly);
    console.log('Sorted city data by anomaly:', this.citys);
  }
}
