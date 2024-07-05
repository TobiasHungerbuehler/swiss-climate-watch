import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapDisplayComponent } from '../map-display/map-display.component';
import { TableDisplayComponent } from '../table-display/table-display.component';

@Component({
  selector: 'app-temp-displays',
  standalone: true,
  imports: [CommonModule, MapDisplayComponent, TableDisplayComponent],
  templateUrl: './temp-displays.component.html',
  styleUrl: './temp-displays.component.scss'
})
export class TempDisplaysComponent {

}
