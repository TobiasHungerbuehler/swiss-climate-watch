import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataDisplayService } from '../services/data-display.service';

@Component({
  selector: 'app-data-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-toggle.component.html',
  styleUrls: ['./data-toggle.component.scss']
})
export class DataToggleComponent {
  constructor(private dataDisplayService: DataDisplayService) {}

  setMode(mode: 'current' | 'dayAverage' | 'monthAverage') {
    this.dataDisplayService.setDisplayMode(mode);
  }
}
