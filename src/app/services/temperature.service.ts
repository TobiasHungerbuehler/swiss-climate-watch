import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
  private temperaturesSubject = new BehaviorSubject<{ [city: string]: string }>({});

  constructor(private http: HttpClient) {
    this.fetchAndStoreTemperatureData();
  }

  // Funktion zum Abrufen und Speichern der Temperaturdaten
  private fetchAndStoreTemperatureData(): void {
    this.http.get(this.csvUrl, { responseType: 'arraybuffer' })
      .pipe(
        map(response => this.parseCSV(response)),
        catchError(error => {
          console.error('Fehler beim Laden der Daten:', error);
          return [];
        })
      )
      .subscribe(parsedData => {
        const temperatureMap = this.mapTemperatures(parsedData);
        this.temperaturesSubject.next(temperatureMap);
      });
  }

  // Funktion zum Parsen der CSV-Daten
  private parseCSV(data: ArrayBuffer): { Stadt: string, Temperatur: string }[] {
    const textDecoder = new TextDecoder('iso-8859-1');
    const csvData = textDecoder.decode(data);
    const rows = csvData.split('\n').slice(1);
    return rows.map(row => {
      const columns = row.split(';');
      return {
        Stadt: columns[0]?.replace(/"/g, ''),
        Temperatur: columns[3]?.replace(/"/g, '')
      };
    }).filter(row => row.Stadt && row.Temperatur);
  }

  // Funktion zum Mappen der Temperaturdaten in ein JSON-Format
  private mapTemperatures(data: { Stadt: string, Temperatur: string }[]): { [city: string]: string } {
    const temperatureMap: { [city: string]: string } = {};
    data.forEach(item => {
      temperatureMap[item.Stadt] = item.Temperatur;
    });
    console.log(temperatureMap); // Ausgabe der gemappten Daten zur Überprüfung
    return temperatureMap;
  }

  // Funktion zum Bereitstellen der Temperaturdaten als Observable
  public getTemperatureObservable(): Observable<{ [city: string]: string }> {
    return this.temperaturesSubject.asObservable();
  }
}
