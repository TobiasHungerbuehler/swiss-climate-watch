import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainStationDataService, MainStationData } from '../services/main-station-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  citys: MainStationData[] = [];

  constructor(private mainStationDataService: MainStationDataService) {}

  ngOnInit() {
    this.mainStationDataService.getMainStationData().subscribe(citys => {
      this.citys = citys.sort((a, b) => b.anomaly - a.anomaly);
      console.log('Sorted citys by anomaly:', this.citys);
    });
  }

}
