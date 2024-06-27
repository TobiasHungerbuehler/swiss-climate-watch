import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { TableComponent } from '../table/table.component';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-temperature-section',
  standalone: true,
  imports: [CommonModule, MapDisplayComponent, DataToggleComponent, TableComponent],
  templateUrl: './temperature-section.component.html',
  styleUrl: './temperature-section.component.scss'
})
export class TemperatureSectionComponent {

}
