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
  citys: StandardStationData[] = [];

  constructor() {}

  ngOnInit() {
    this.updateCityData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapDisplayData']) {
      this.updateCityData();
    }
  }

  private updateCityData(): void {
    this.citys = [...this.mapDisplayData];
    this.sortCitysByAnomalie();
  }

  private sortCitysByAnomalie(): void {
    this.citys.sort((a, b) => {
      const anomalyA = a.currentTemp - (a.refTemp || 0);
      const anomalyB = b.currentTemp - (b.refTemp || 0);
      return anomalyB - anomalyA;
    });
    console.log('Sorted city data by anomaly:', this.citys);
  }
}
