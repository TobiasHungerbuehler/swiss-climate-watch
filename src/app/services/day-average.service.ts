import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayAverageTemperatureService {
  private apiUrl = 'https://swissclimatewatch.thtech.ch/get_avg_temp_data.php'; // Ersetzen Sie dies durch die URL Ihrer PHP-Datei

  constructor(private http: HttpClient) {
    this.getAverageTemperatures();
  }

  // Methode zum Abrufen der durchschnittlichen Temperaturen
  getAverageTemperatures(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => console.log('Fetched average temperatures:', data))
    );
  }
}
