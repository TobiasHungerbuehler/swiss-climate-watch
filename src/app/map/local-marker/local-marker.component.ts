import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureService } from '../../services/temperature.service';

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

  cityMarkers = [
    { top: '20%', left: '57%', city: 'Zürich / Kloten', temperature: '' },
    { top: '13%', left: '71%', city: 'St. Gallen', temperature: '' },
    { top: '25%', left: '74%', city: 'Säntis', temperature: '' },
    { top: '72%', left: '32%', city: 'Sion', temperature: '' },
    { top: '60%', left: '85%', city: 'Samedan', temperature: '' },
    { top: '13%', left: '37%', city: 'Basel / Binningen', temperature: '' },
    { top: '40%', left: '34%', city: 'Bern / Zollikofen', temperature: '' },
    { top: '72%', left: '6%', city: 'Genève / Cointrin', temperature: '' },
    { top: '74%', left: '63%', city: 'Locarno / Monti', temperature: '' },
    { top: '34%', left: '52%', city: 'Luzern', temperature: '' },
    { top: '45%', left: '86%', city: 'Davos', temperature: '' },
    { top: '43%', left: '54%', city: 'Engelberg', temperature: '' },
    { top: '49%', left: '48%', city: 'Meiringen', temperature: '' },
    { top: '56%', left: '57%', city: 'Andermatt', temperature: '' },
    { top: '34%', left: '77%', city: 'Bad Ragaz', temperature: '' },
    { top: '40%', left: '70%', city: 'Elm', temperature: '' },
    { top: '33%', left: '20%', city: 'La Chaux-de-Fonds', temperature: '' },
    { top: '44%', left: '23%', city: 'Payerne', temperature: '' },
    { top: '63%', left: '25%', city: "Château-d'Oex", temperature: '' },
    { top: '82%', left: '66%', city: 'Lugano', temperature: '' },
    { top: '86%', left: '27%', city: 'Col du Grand St-Bernard', temperature: '' },
  ];

  constructor(private temperatureService: TemperatureService) {}

  ngOnInit(): void {
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
