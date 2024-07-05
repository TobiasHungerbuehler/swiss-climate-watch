import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateNameService {

  constructor() { }

  getMonthName(month: number): string {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    
    if (month < 1 || month > 12) {
      throw new Error('Ungültiger Monat. Bitte geben Sie eine Zahl zwischen 1 und 12 ein.');
    }

    
    return monthNames[month - 1];
  }
}
