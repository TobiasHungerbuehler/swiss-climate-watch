import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  // Observable für die aktuelle Uhrzeit im Format hh:mm (24-Stunden-Format)
  getCurrentTime(): Observable<string> {
    return interval(1000).pipe(
      map(() => {
        const now = new Date();
        const hours = this.padZero(now.getHours());
        const minutes = this.padZero(now.getMinutes());
        return `${hours}:${minutes}`;
      })
    );
  }

  // Observable für das aktuelle Datum im Format Montag, 4. Januar 2024
  getCurrentDate(): Observable<string> {
    return interval(1000).pipe(
      map(() => this.formatDate(new Date()))
    );
  }

  // Observable für das Datum des Vortages im Format Sonntag, 3. Januar 2024
  getPreviousDate(): Observable<string> {
    return interval(1000).pipe(
      map(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return this.formatDate(yesterday);
      })
    );
  }

  // Hilfsfunktion, um eine führende Null hinzuzufügen, wenn die Zahl einstellig ist
  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  // Hilfsfunktion, um ein Datum im Format Montag, 4. Januar 2024 zu formatieren
  private formatDate(date: Date): string {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    // return `${dayName}, ${day}. ${monthName} ${year}`;
    return `${day}. ${monthName} ${year}`;
  }


    // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
    // getMonth(): number {
    //   const date = new Date();
    //   return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
    // }

}
