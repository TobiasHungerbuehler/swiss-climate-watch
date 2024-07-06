import { Component, OnInit } from '@angular/core';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { MapComponent } from '../map-display/map/map.component';
import { TempDisplaysComponent } from '../temp-displays/temp-displays.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ DataToggleComponent,MapComponent, TempDisplaysComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor() { // Füge den TemperatureService zum Konstruktor hinzu
  }

  ngOnInit(): void {


  }
}
