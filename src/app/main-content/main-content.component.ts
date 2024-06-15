import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MapComponent, DataToggleComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
