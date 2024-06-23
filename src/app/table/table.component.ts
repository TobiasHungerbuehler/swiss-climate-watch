import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainStationDataService, MainStationData } from '../services/main-station-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  citys: MainStationData[] = [];

  constructor(private mainStationDataService: MainStationDataService){}

  ngOnInit() {
    this.mainStationDataService.getMainStationData().subscribe(citys => {
      this.citys = citys;
    });
    console.log('row',this.citys);
    
  }



}
