import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LocalMarkerComponent } from './local-marker/local-marker.component';
import { StandardStationData } from '../../services/standard-station-data.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LocalMarkerComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('coldMap') coldMap!: ElementRef;
  @ViewChild('coolMap') coolMap!: ElementRef;
  @ViewChild('warmMap') warmMap!: ElementRef;
  @ViewChild('hotMap') hotMap!: ElementRef;
  @ViewChild('veryHotMap') veryHotMap!: ElementRef;

  @Input() mapDisplayData: StandardStationData[] = [];

  highestTemp: number = 0;
  isViewInit = false; // Flag to check if view is initialized

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapDisplayData']) {
      this.calculateHighestTemp();
      if (this.isViewInit) {
        this.updateMapOpacity(this.highestTemp);
      }
    }
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
    this.updateMapOpacity(this.highestTemp);
    this.logMapContainerHeight();

    const resizeObserver = new ResizeObserver(() => {
      this.logMapContainerHeight();
    });

    resizeObserver.observe(this.mapContainer.nativeElement);
  }

  calculateHighestTemp(): void {
    if (this.mapDisplayData.length > 0) {
      this.highestTemp = Math.max(...this.mapDisplayData.map(station => station.currentTemp));
    } else {
      this.highestTemp = 0;
    }
  }

  updateMapOpacity(temp: number): void {
    if (!this.isViewInit) {
      return;
    }

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

  logMapContainerHeight(): void {
    const height = this.mapContainer.nativeElement.offsetHeight;
    //console.log('Map Container Height:', height);
  }
}
