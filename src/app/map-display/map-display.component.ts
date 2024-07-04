import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CurrentTemperatureService } from '../services/current-temperature.service';
import { DayAverageTemperatureService } from '../services/day-average.service';
import { StandardStationData } from '../services/standard-station-data.service';
import { DataDisplayService } from '../services/data-display.service';
import { Observable, Subscription } from 'rxjs';
import { MonthAverageService } from '../services/month-average.service';
import { TableComponent } from '../table/table.component';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, MapComponent, TableComponent, DataToggleComponent],
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit, OnDestroy {

  mapDisplayData: StandardStationData[] = [];
  private subscriptions: Subscription[] = [];
  private displayMode: 'current' | 'dayAverage' | 'monthAverage' = 'current';
  private serviceSubscription: Subscription | null = null; // Abonnement für den ausgewählten Datenservice


  constructor(
    private currentTemperatureService: CurrentTemperatureService,
    private dayAverageTemperatureService: DayAverageTemperatureService,
    private monthAverageService: MonthAverageService,
    private dataDisplayService: DataDisplayService
  ) { }

  ngOnInit(): void {
    // Abonniere den Anzeigemodus
    this.subscriptions.push(
      this.dataDisplayService.getDisplayMode().subscribe(mode => {
        this.displayMode = mode;
        this.updateMapDisplayData(this.displayMode);
      })
    );

    // Initialisiere die Monatsdurchschnittsdaten und aktualisiere die Karte, wenn der Modus 'monthAverage' ist
    this.monthAverageService.createMonthAverageJson().then(() => {
      if (this.displayMode === 'monthAverage') {
        this.updateMapDisplayData('monthAverage');
      }
    });

    // Abonniere die ausgewählten Monat-Daten
    this.subscriptions.push(
      this.dataDisplayService.getMonthDataSelected().subscribe(date => {
        if (date) {
          this.setMonthData(date.year, date.month);
        }
      })
    );
  }

  // Setzt die Monat-Daten und aktualisiert die Kartendarstellung
  setMonthData(year: number, month: number): void {
    this.monthAverageService.setMonthData(year, month);
    this.mapDisplayData = this.monthAverageService.getMonthAverageData();
    this.displayMode = 'monthAverage';
    this.updateMapDisplayData('monthAverage');
    console.log('Month data after setting to', year, month, ':', this.mapDisplayData);
  }

  // Aktualisiert die Kartendarstellung basierend auf dem ausgewählten Modus
  private updateMapDisplayData(mode: 'current' | 'dayAverage' | 'monthAverage'): void {
    // Beende das Abonnement des aktuellen Datenservice, um Mehrfachabonnements zu vermeiden
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    // Abonniere den entsprechenden Datenservice basierend auf dem Anzeigemodus
    if (mode === 'current') {
      this.subscribeToService(this.currentTemperatureService.currentTemperature$);
    } else if (mode === 'dayAverage') {
      this.subscribeToService(this.dayAverageTemperatureService.dayAverageTemperature$);
    } else if (mode === 'monthAverage') {
      this.mapDisplayData = this.monthAverageService.getMonthAverageData();
      console.log(`Data for ${mode}:`, this.mapDisplayData);
    }
  }

  // Abonniere einen Datenservice und aktualisiere die Kartendarstellung
  private subscribeToService(source: Observable<StandardStationData[]>): void {
    this.serviceSubscription = source.subscribe((data: StandardStationData[]) => {
      this.mapDisplayData = data;
      console.log(`Data for ${this.displayMode}:`, this.mapDisplayData);
    });
  }

  // Aufräumen der Abonnements beim Zerstören der Komponente
  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
