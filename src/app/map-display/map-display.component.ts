import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { StandardStationData } from '../services/standard-station-data.service';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit {

  constructor(private currentTemperatureService: CurrentTemperatureService) { }

  ngOnInit(): void {
    this.currentTemperatureService.currentTemperature$.subscribe((data: StandardStationData[]) => {
      console.log('CURRENT TEMP DATA:', data);
    });
  }
}
