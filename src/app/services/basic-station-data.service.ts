import { Injectable } from '@angular/core';
import { ReferenceDataService } from './reference-data.service';

@Injectable({
  providedIn: 'root'
})
export class BasicStationDataService {
  private basicStationData = [
    { cityName: "Andermatt", top: '56%', left: '58%', city: 'ANT', als: 1438, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Bad Ragaz", top: '38%', left: '77%', city: 'RAG', als: 496, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Basel", top: '14%', left: '37%', city: 'BAS', als: 316, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Bern", top: '42%', left: '34%', city: 'BER', als: 553, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Château-d'Oex", top: '66%', left: '26%', city: 'CHD', als: 1028, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Davos", top: '48%', left: '87%', city: 'DAV', als: 1594, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Elm", top: '43%', left: '71%', city: 'ELM', als: 957, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Engelberg", top: '47%', left: '55%', city: 'ENG', als: 1035, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Genf", top: '76%', left: '6%', city: 'GEA', als: 376, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Grand St-Bernard", top: '90%', left: '27%', city: 'GSB', als: 2472, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "La Chaux-de-Fonds", top: '35%', left: '21%', city: 'CDF', als: 1017, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Locarno", top: '79%', left: '63%', city: 'OTL', als: 367, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Lugano", top: '86%', left: '66.5%', city: 'LUG', als: 273, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Luzern", top: '37%', left: '52%', city: 'LUZ', als: 455, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Meiringen", top: '52%', left: '48%', city: 'MER', als: 588, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Payerne", top: '47%', left: '23%', city: 'PAY', als: 490, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Säntis", top: '26%', left: '74%', city: 'SAE', als: 2501, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Samedan", top: '60%', left: '86%', city: 'SAM', als: 1708, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Sion", top: '75%', left: '32%', city: 'SIO', als: 482, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "St.Gallen", top: '19%', left: '75%', city: 'STG', als: 775, currentTemp: 0, refTemp: 0, anomaly: 0 },
    { cityName: "Zürich", top: '22%', left: '57%', city: 'SMA', als: 556, currentTemp: 0, refTemp: 0, anomaly: 0 },
  ];

  constructor(private referenceDataService: ReferenceDataService) {
    this.loadReferenceTemperatures();
  }

  // Funktion, um die Basisstation-Daten zurückzugeben
  getBasicStationData() {
    return this.basicStationData;
  }

  // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
  private getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
  }

  // Lade die Referenztemperaturen aus dem HistoryDataService
  private loadReferenceTemperatures(): void {
    const referenceData = this.referenceDataService.getReferenceData();
    const currentMonth = this.getMonth().toString(); // Konvertiere die Monatszahl in einen String
    referenceData.forEach(ref => {
      const station = this.basicStationData.find(station => station.city === ref.city);
      if (station && ref.referenceTemp[currentMonth as keyof typeof ref.referenceTemp]) {
        station.refTemp = ref.referenceTemp[currentMonth as keyof typeof ref.referenceTemp].average;
        station.anomaly = station.currentTemp - station.refTemp;
      }
    });
  }
}
