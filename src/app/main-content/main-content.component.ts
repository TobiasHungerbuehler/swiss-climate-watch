import { Component, OnInit } from '@angular/core';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';

import { TemperatureSectionComponent } from '../temperature-section/temperature-section.component';
import { MapComponent } from '../map-display/map/map.component';



@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ DataToggleComponent, TemperatureSectionComponent, MapComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor() { // Füge den TemperatureService zum Konstruktor hinzu
  }

  ngOnInit(): void {


  }
}
