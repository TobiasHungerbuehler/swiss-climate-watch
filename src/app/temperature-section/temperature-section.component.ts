import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { LocalMarkerComponent } from '../map/local-marker/local-marker.component';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-temperature-section',
  standalone: true,
  imports: [CommonModule, MapComponent, DataToggleComponent, TableComponent],
  templateUrl: './temperature-section.component.html',
  styleUrl: './temperature-section.component.scss'
})
export class TemperatureSectionComponent {

}
