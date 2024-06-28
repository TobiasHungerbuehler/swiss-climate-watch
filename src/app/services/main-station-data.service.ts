// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, combineLatest, subscribeOn } from 'rxjs';
// import { map, filter } from 'rxjs/operators';
// import { TemperatureService, CurrentTemp } from './temperature.service';
// import { ReferenceDataService } from './reference-data.service';
// import { DataDisplayService } from './data-display.service';
// import { DayAverageTemperatureService } from './day-average.service';
// import { StandardStationDataService, StandardStationData } from './standard-station-data.service';

// export interface MainStationData extends StandardStationData {}

// @Injectable({
//   providedIn: 'root'
// })
// export class MainStationDataService {
//   private mainStationData: MainStationData[] = this.standardStationDataService.getStandardStationData();
//   private mainStationDataSubject = new BehaviorSubject<MainStationData[]>(this.mainStationData);

//   private highestTempSubject = new BehaviorSubject<number>(0); // BehaviorSubject für höchste Temperatur

//   constructor(
//     private temperatureService: TemperatureService,
//     private referenceDataService: ReferenceDataService,
//     private dataDisplayService: DataDisplayService,
//     private dayAverageTemperatureService: DayAverageTemperatureService,
//     private standardStationDataService: StandardStationDataService
//   ) {
//     this.subscribeToDisplayMode();
//     this.loadReferenceTemperatures();
//   }

//   // Observable für die Hauptstationdaten
//   getMainStationData(): Observable<MainStationData[]> {
//     return this.mainStationDataSubject.asObservable();
//   }

//   // Observable für die höchste Temperatur
//   getHighestTempObservable(): Observable<number> {
//     return this.highestTempSubject.asObservable();
//   }

//   // Abonniere den Anzeigemodus vom DataDisplayService
//   private subscribeToDisplayMode(): void {
//     this.dataDisplayService.getDisplayMode().subscribe(mode => {
//       if (mode === 'current') {
//         this.subscribeToTemperatureUpdates();
//       } 
//       if (mode === 'dayAverage') {
//         this.subscribeToDayAverage();
//       } 
//     });
//   }



//   // Lade die Referenztemperaturen von Firebase
//   private loadReferenceTemperatures(): void {
//     const currentMonth = this.getMonth(); // Konvertiere die Monatszahl in einen String
//     this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).subscribe(referenceData => {
//       this.mainStationData.forEach(station => {
//         const ref = referenceData.find(r => r.city === station.city);
//         if (ref) {
//           station.refTemp = ref.referenceTemp.average;
//           station.anomaly = parseFloat((station.currentTemp - station.refTemp).toFixed(1));
//         }
//       });
//       this.mainStationDataSubject.next(this.mainStationData);      
//     });
//   }

//   // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
//   private getMonth(): number {
//     const date = new Date();
//     return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
//   }

//   // Abonniere die Temperaturupdates vom TemperatureService
//   private subscribeToTemperatureUpdates(): void {
//     combineLatest([
//       this.temperatureService.getCurrentTempObservable(),
//       this.dataDisplayService.getDisplayMode()
//     ]).pipe(
//       filter(([, mode]) => mode === 'current')
//     ).subscribe(([currentTemps]) => {
//       this.updateCurrentTemps(currentTemps);
//       this.calculateAndSetHighestTemp();
//     });
//   }

//   // Abonniere die durchschnittlichen Tagestemperaturen vom DayAverageTemperatureService
//   private subscribeToDayAverage(): void {
//     combineLatest([
//       this.dayAverageTemperatureService.getAverageTemperatures(),
//       this.dataDisplayService.getDisplayMode()
//     ]).pipe(
//       filter(([, mode]) => mode === 'dayAverage')
//     ).subscribe(([avgTemps]) => {
//       this.updateDayAverageTemps(avgTemps);
//     });
//   }

// // Aktualisiere die durchschnittlichen Tagestemperaturen
// private updateDayAverageTemps(avgTemps: any[]): void {
//   this.mainStationData.forEach(station => {
//     const temp = avgTemps.find(t => t.city === station.city);
//     if (temp && !isNaN(temp.avg_temp)) {
//       const avgTemp = parseFloat(temp.avg_temp);
//       station.currentTemp = parseFloat(avgTemp.toFixed(1));
//       station.anomaly = parseFloat((station.currentTemp - station.refTemp).toFixed(1));
//     }
//   });
//   this.mainStationDataSubject.next(this.mainStationData);
//   this.calculateAndSetHighestTemp();
// }

//   // Aktualisiere die aktuellen Temperaturen und Anomalien
//   private updateCurrentTemps(currentTemps: CurrentTemp[]): void {
//     this.mainStationData.forEach(station => {
//       const temp = currentTemps.find(t => t.city === station.city);
//       if (temp) {
//         station.currentTemp = temp.currentTemp;
//         station.anomaly = station.currentTemp - station.refTemp;
//       }
//     });
//     this.mainStationDataSubject.next(this.mainStationData);
//   }

//   // Berechne und setze die höchste Temperatur
//   private calculateAndSetHighestTemp(): void {
//     const highestTemp = this.mainStationData.length === 0 ? 0 : Math.max(...this.mainStationData.map(station => station.currentTemp));
//     this.highestTempSubject.next(highestTemp);
//   }
// }
