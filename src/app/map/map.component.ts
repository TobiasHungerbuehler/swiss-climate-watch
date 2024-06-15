import { CommonModule } from '@angular/common';
import {  Component, ElementRef, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import { LocalMarkerComponent } from './local-marker/local-marker.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LocalMarkerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  @ViewChild('coldMap') coldMap!: ElementRef;
  @ViewChild('coolMap') coolMap!: ElementRef;
  @ViewChild('warmMap') warmMap!: ElementRef;
  @ViewChild('hotMap') hotMap!: ElementRef;
  @ViewChild('veryHotMap') veryHotMap!: ElementRef;

  ngAfterViewInit() {
    this.updateMapOpacity(10); // Initial example temperature
  }

  updateMapOpacity(temp: number): void {
    this.coldMap.nativeElement.style.opacity = '0';
    this.coolMap.nativeElement.style.opacity = '0';
    this.warmMap.nativeElement.style.opacity = '0';
    this.hotMap.nativeElement.style.opacity = '0';
    this.veryHotMap.nativeElement.style.opacity = '0';

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
