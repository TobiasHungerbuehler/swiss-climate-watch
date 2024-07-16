import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-map-dashboard',
  standalone: true,
  imports: [CommonModule, MapDisplayComponent],
  templateUrl: './map-dashboard.component.html',
  styleUrl: './map-dashboard.component.scss'
})
export class MapDashboardComponent {

}
