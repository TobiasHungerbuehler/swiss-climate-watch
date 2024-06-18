import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemperatureService, CurrentTemp } from './temperature.service';
import { ReferenceDataService, ReferenceData } from './reference-data.service';
import { DataDisplayService } from './data-display.service';

export interface MainStationData {
  cityName: string;
  top: string;
  left: string;
  city: string;
  als: number;
  currentTemp: number;
  refTemp: number;
  anomaly: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainStationDataService {
  private mainStationData: MainStationData[] = [
    { cityName: "Zürich", top: '20%', left: '57%', city: 'Zürich / Fluntern', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "St.Gallen", top: '13%', left: '71%', city: 'St. Gallen', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Säntis", top: '25%', left: '74%', city: 'Säntis', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Sion", top: '72%', left: '32%', city: 'Sion', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Samedan", top: '60%', left: '85%', city: 'Samedan', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Basel", top: '13%', left: '37%', city: 'Basel / Binningen', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Bern", top: '40%', left: '34%', city: 'Bern / Zollikofen', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Genf", top: '72%', left: '6%', city: 'Genève / Cointrin', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Locarno", top: '74%', left: '63%', city: 'Locarno / Monti', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Luzern", top: '34%', left: '52%', city: 'Luzern', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Davos", top: '45%', left: '86%', city: 'Davos', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Engelberg", top: '43%', left: '54%', city: 'Engelberg', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Meiringen", top: '49%', left: '48%', city: 'Meiringen', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Andermatt", top: '56%', left: '57%', city: 'Andermatt', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Bad Ragaz", top: '34%', left: '77%', city: 'Bad Ragaz', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Elm", top: '40%', left: '70%', city: 'Elm', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "La Chaux-de-Fonds", top: '33%', left: '20%', city: 'La Chaux-de-Fonds', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Payerne", top: '44%', left: '23%', city: 'Payerne', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Château-d'Oex", top: '63%', left: '25%', city: "Château-d'Oex", als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Lugano", top: '82%', left: '66%', city: 'Lugano', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Grand St-Bernard", top: '86%', left: '27%', city: 'Col du Grand St-Bernard', als: 0, currentTemp: 0, refTemp: 0, anomaly: 0 },
  ];

  private mainStationDataSubject = new BehaviorSubject<MainStationData[]>(this.mainStationData);
  private highestTempSubject = new BehaviorSubject<number>(0); // BehaviorSubject für höchste Temperatur

  constructor(
    private temperatureService: TemperatureService,
    private referenceDataService: ReferenceDataService,
    private dataDisplayService: DataDisplayService
  ) {
    this.subscribeToDisplayMode();
  }

  // Observable für die Hauptstationdaten
  getMainStationData(): Observable<MainStationData[]> {
    return this.mainStationDataSubject.asObservable();
  }

  // Observable für die höchste Temperatur
  getHighestTempObservable(): Observable<number> {
    return this.highestTempSubject.asObservable();
  }

  // Abonniere den Anzeigemodus vom DataDisplayService
  private subscribeToDisplayMode(): void {
    this.dataDisplayService.getDisplayMode().subscribe(mode => {
      if (mode === 'current') {
        this.subscribeToTemperatureUpdates();
        this.loadReferenceTemperatures();
      } else {
        this.loadHistoricalData();
      }
    });
  }

  // Lade die Referenztemperaturen aus dem HistoryDataService
  private loadReferenceTemperatures(): void {
    const referenceData = this.referenceDataService.getReferenceData();
    const currentMonth = this.getMonth().toString(); // Konvertiere die Monatszahl in einen String
    referenceData.forEach(ref => {
      const station = this.mainStationData.find(station => station.city === ref.city);
      if (station && ref.referenceTemp[currentMonth as keyof typeof ref.referenceTemp]) {
        station.refTemp = ref.referenceTemp[currentMonth as keyof typeof ref.referenceTemp].average;
        station.anomaly = station.currentTemp - station.refTemp;
      }
    });
    this.mainStationDataSubject.next(this.mainStationData);
    console.log(this.mainStationData); // Kontrollausgabe der aktualisierten Referenzdaten
  }

  // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
  }

  // Abonniere die Temperaturupdates vom TemperatureService
  private subscribeToTemperatureUpdates(): void {
    this.temperatureService.getCurrentTempObservable().subscribe(currentTemps => {
      this.updateCurrentTemps(currentTemps);
      this.calculateAndSetHighestTemp();
    });
  }

  // Aktualisiere die aktuellen Temperaturen und Anomalien
  private updateCurrentTemps(currentTemps: CurrentTemp[]): void {
    currentTemps.forEach(temp => {
      const station = this.mainStationData.find(station => station.city === temp.city);
      if (station) {
        station.currentTemp = temp.currentTemp;
        station.anomaly = station.currentTemp - station.refTemp;
      }
    });
    this.mainStationDataSubject.next(this.mainStationData);
    this.calculateAndSetHighestTemp(); // Verschiebe die Berechnung hierher
    console.log(this.mainStationData); // Kontrollausgabe
  }

  // Berechne und setze die höchste Temperatur
  private calculateAndSetHighestTemp(): void {
    const highestTemp = this.mainStationData.length === 0 ? 0 : Math.max(...this.mainStationData.map(station => station.currentTemp));
    this.highestTempSubject.next(highestTemp);
    console.log('Highest Temperature:', highestTemp); // Kontrollausgabe der höchsten Temperatur
  }

  // Lade historische Daten (noch nicht implementiert)
  private loadHistoricalData(): void {
    // Implementiere das Laden historischer Daten hier
  }
}
