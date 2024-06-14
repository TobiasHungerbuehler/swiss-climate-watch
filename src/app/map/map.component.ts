import { CommonModule } from '@angular/common';
import {  Component, ElementRef, ViewChild, AfterViewInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  // ViewChild Dekoratoren für die Elemente, die wir im Template referenzieren
  @ViewChild('tooltip') tooltip!: ElementRef;
  @ViewChild('coldMap') coldMap!: ElementRef;
  @ViewChild('coolMap') coolMap!: ElementRef;
  @ViewChild('warmMap') warmMap!: ElementRef;
  @ViewChild('hotMap') hotMap!: ElementRef;
  @ViewChild('veryHotMap') veryHotMap!: ElementRef;

  tooltipContent = ''; // Inhalt des Tooltips
  cityMarkers = [
    { top: '50%', left: '50%', city: 'Sample City' }
    // Weitere Marker können hier hinzugefügt werden
  ];

  ngAfterViewInit() {
    // Setzt die Opazität der Kartenebenen basierend auf einer Beispieltemperatur
    this.updateMapOpacity(35); // Beispieltemperatur für das Testing
  }

  // Wird ausgelöst, wenn der Mauszeiger über einen Marker fährt
  onMouseEnter(event: MouseEvent, city: string): void {
    this.tooltipContent = `City: ${city}`; // Setzt den Inhalt des Tooltips
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    tooltip.style.display = 'block'; // Zeigt den Tooltip an
    this.moveTooltip(event); // Positioniert den Tooltip basierend auf der Mausposition
  }

  // Wird ausgelöst, wenn der Mauszeiger den Marker verlässt
  onMouseLeave(): void {
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    tooltip.style.display = 'none'; // Versteckt den Tooltip
  }

  // Wird ausgelöst, wenn die Maus über den Marker bewegt wird
  onMouseMove(event: MouseEvent): void {
    this.moveTooltip(event); // Positioniert den Tooltip basierend auf der Mausposition
  }

  // Positioniert den Tooltip basierend auf der Mausposition
  moveTooltip(event: MouseEvent): void {
    const tooltip = this.tooltip.nativeElement as HTMLElement;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.left = `${event.pageX + 10}px`;
  }

  // Aktualisiert die Opazität der Kartenebenen basierend auf der Temperatur
  updateMapOpacity(temp: number): void {
    // Setzt die Opazität aller Ebenen auf 0
    this.coldMap.nativeElement.style.opacity = '0';
    this.coolMap.nativeElement.style.opacity = '0';
    this.warmMap.nativeElement.style.opacity = '0';
    this.hotMap.nativeElement.style.opacity = '0';
    this.veryHotMap.nativeElement.style.opacity = '0';

    // Setzt die Opazität der entsprechenden Ebene basierend auf der Temperatur
    if (temp <= 0) {
      this.coldMap.nativeElement.style.opacity = '0.8';
    } else if (temp > 0 && temp <= 10) {
      this.coolMap.nativeElement.style.opacity = '0.8';
    } else if (temp > 10 && temp <= 20) {
      this.warmMap.nativeElement.style.opacity = '0.8';
    } else if (temp > 20 && temp <= 30) {
      this.hotMap.nativeElement.style.opacity = '0.8';
    } else {
      this.veryHotMap.nativeElement.style.opacity = '0.8';
    }
  }

}
