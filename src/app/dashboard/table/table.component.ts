import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StandardStationData } from '../../services/standard-station-data.service';

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

  constructor() {}

  ngOnInit() {
    this.updateCityData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapDisplayData'] && this.mapDisplayData.length > 0) {
      //console.log('table component onChanges', this.mapDisplayData);
      this.updateCityData();
    }
  }

  private updateCityData(): void {
    this.citys = this.mapDisplayData.map(city => ({
      ...city,
      anomaly: city.currentTemp - (city.refTemp || 0)
    })).sort((a, b) => b.anomaly - a.anomaly);
  }
}
