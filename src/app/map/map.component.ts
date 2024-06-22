import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { LocalMarkerComponent } from './local-marker/local-marker.component';
import { MainStationDataService } from '../services/main-station-data.service';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LocalMarkerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('coldMap') coldMap!: ElementRef;
  @ViewChild('coolMap') coolMap!: ElementRef;
  @ViewChild('warmMap') warmMap!: ElementRef;
  @ViewChild('hotMap') hotMap!: ElementRef;
  @ViewChild('veryHotMap') veryHotMap!: ElementRef;

  highestTemp: number = 0;
  isViewInit = false; // Flag to check if view is initialized

  constructor(private mainStationDataService: MainStationDataService) {}

  ngOnInit(): void {
    // Abonniere die höchste Temperatur und aktualisiere `highestTemp`
    this.mainStationDataService.getHighestTempObservable().subscribe(temp => {
      this.highestTemp = temp;
      if (this.isViewInit) {
        this.updateMapOpacity(this.highestTemp); // Aktualisiere die Karte, wenn `highestTemp` sich ändert und die View initialisiert ist
      }
    });
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
    // Sicherstellen, dass das DOM-Element verfügbar ist, bevor `updateMapOpacity` aufgerufen wird
    this.updateMapOpacity(this.highestTemp);
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
}
