import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainStationDataService, MainStationData } from '../../services/main-station-data.service';
import { DayAverageTemperatureService } from '../../services/day-average.service';

@Component({
  selector: 'app-local-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-marker.component.html',
  styleUrls: ['./local-marker.component.scss']
})
export class LocalMarkerComponent implements OnInit {
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  tooltipContent = '';
  cityMarkers: MainStationData[] = [];
  displayMode: 'current' | 'historical' = 'current';

  constructor(private mainStationDataService: MainStationDataService, private dayAverageTemperatureService: DayAverageTemperatureService) { }

  ngOnInit(): void {
    // Abonniere die mainStationData von MainStationDataService
    this.mainStationDataService.getMainStationData().subscribe(markers => {
      this.cityMarkers = markers;
    });

    this.dayAverageTemperatureService.getAverageTemperatures().subscribe();
  }

  onMarkerMouseEnter(event: MouseEvent, city: string): void {
    this.tooltipContent = `City: ${city}`;
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    tooltip.style.display = 'block';
    this.moveTooltip(event); // Move tooltip to follow the mouse
  }

  onMarkerMouseLeave(): void {
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    tooltip.style.display = 'none';
  }

  onMarkerMouseMove(event: MouseEvent): void {
    this.moveTooltip(event);
  }

  moveTooltip(event: MouseEvent): void {
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    const mapContainer = this.mapContainer.nativeElement as HTMLElement;
    const containerRect = mapContainer.getBoundingClientRect();
    tooltip.style.top = `${event.clientY - containerRect.top + 10}px`;
    tooltip.style.left = `${event.clientX - containerRect.left + 10}px`;
  }
}
