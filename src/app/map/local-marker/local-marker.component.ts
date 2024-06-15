import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureService } from '../../services/temperature.service';
import { CityMarkerService, CityMarker } from '../../services/local-marker.service';
import { HistoryDataService,ReferenceData, ReferenceTemp } from '../../services/history-data.service';

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
  cityMarkers: CityMarker[] = [];
  referenceData: ReferenceData[] = []
  monthData: ReferenceTemp[] = [];

  constructor(private temperatureService: TemperatureService, private cityMarkerService: CityMarkerService, private historyDataService: HistoryDataService) { }

  ngOnInit(): void {

    this.referenceData = this.historyDataService.getReferenceData();
    this.monthData = this.referenceData.map(data => data.referenceTemp["6"]);


    // Lade die Marker aus dem CityMarkerService
    this.cityMarkers = this.cityMarkerService.getCityMarkers();

    this.temperatureService.getTemperatureObservable().subscribe(temperatures => {
      this.cityMarkers.forEach(marker => {
        marker.temperature = temperatures[marker.city] || 'N/A';
      });
    });
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
