import { Component, OnInit } from '@angular/core';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';

import { MapComponent } from '../map-display/map/map.component';
import { MapDisplayComponent } from '../map-display/map-display.component';



@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ DataToggleComponent,MapComponent, MapDisplayComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor() { // Füge den TemperatureService zum Konstruktor hinzu
  }

  ngOnInit(): void {


  }
}
