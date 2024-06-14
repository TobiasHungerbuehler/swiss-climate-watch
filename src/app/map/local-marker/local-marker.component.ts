import { CommonModule } from '@angular/common';
import {  Component, Input, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-local-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-marker.component.html',
  styleUrl: './local-marker.component.scss'
})
export class LocalMarkerComponent {

  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  tooltipContent = '';

  cityMarkers = [
    { top: '20%', left: '57%', city: 'Zürich' },
    { top: '13%', left: '71%', city: 'St.Gallen' },
    { top: '25%', left: '74%', city: 'Säntis' },
    { top: '72%', left: '32%', city: 'Sion' },
    { top: '60%', left: '85%', city: 'Samedan' },
    { top: '13%', left: '37%', city: 'Basel' },
    { top: '40%', left: '34%', city: 'Bern' },
    { top: '72%', left: '6%', city: 'Genf' },
    { top: '74%', left: '63%', city: 'Locarno' },
    { top: '34%', left: '52%', city: 'Luzern' },
    { top: '45%', left: '86%', city: 'Davos' },
    { top: '43%', left: '54%', city: 'Engelberg' },
    { top: '49%', left: '48%', city: 'Meiringen' },
    { top: '56%', left: '57%', city: 'Andermatt' },
    { top: '34%', left: '77%', city: 'Bad Ragaz' },
    { top: '40%', left: '70%', city: 'Elm' },
    { top: '33%', left: '20%', city: 'La Chaux-de-Fonds' },
    { top: '44%', left: '23%', city: 'Payerne' },
    { top: '63%', left: '25%', city: 'Château-dOex' },
    { top: '82%', left: '66%', city: 'Lugano' },
    { top: '86%', left: '27%', city: 'Col du Grand St-Bernard' },
  ];

  ngAfterViewInit() {
    // Initialize if needed
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
