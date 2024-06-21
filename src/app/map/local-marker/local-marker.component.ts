import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTempService } from '../../services/current-temp.service';
import { DayAverageTemperatureService } from '../../services/day-average.service';
import { DataDisplayService } from '../../services/data-display.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-marker.component.html',
  styleUrls: ['./local-marker.component.scss']
})
export class LocalMarkerComponent implements OnInit, OnDestroy {
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  tooltipContent = '';
  cityMarkers: any[] = [];  // Der Typ sollte angepasst werden, wenn du ein Interface für die Daten hast
  private currentTempSubscription: Subscription | null = null;
  private displayModeSubscription: Subscription | null = null;

  constructor(
    private currentTempService: CurrentTempService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private dataDisplayService: DataDisplayService
  ) {}

  ngOnInit(): void {
    this.displayModeSubscription = this.dataDisplayService.displayMode$.subscribe(mode => {
      if (mode === 'current') {
        // Abonniere die aktuellen Temperaturdaten
        if (this.currentTempSubscription) {
          this.currentTempSubscription.unsubscribe();
        }
        this.currentTempSubscription = this.currentTempService.currentStationData$.subscribe(markers => {
          this.cityMarkers = markers;
        });
      } else {
        if (this.currentTempSubscription) {
          this.currentTempSubscription.unsubscribe();
        }
        this.dayAverageTemperatureService.getAverageTemperatures().subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.currentTempSubscription) {
      this.currentTempSubscription.unsubscribe();
    }
    if (this.displayModeSubscription) {
      this.displayModeSubscription.unsubscribe();
    }
  }

  onMarkerMouseEnter(event: MouseEvent, city: string): void {
    const marker = this.cityMarkers.find(marker => marker.city === city);
    if (marker) {
      this.tooltipContent = `City: ${marker.cityName}, Temp: ${marker.currentTemp}°C, Anomaly: ${marker.anomaly}°C`;
    } else {
      this.tooltipContent = `City: ${city}`;
    }
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
