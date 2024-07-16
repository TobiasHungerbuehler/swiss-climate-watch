import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardToggleServiceService {

  private dashboardModeSubject = new BehaviorSubject<'map' | 'table'>('map');

  constructor() { }

  
  // Setzt den Anzeigemodus
  setDashboardMode(mode: 'map' | 'table' ): void {
    this.dashboardModeSubject.next(mode);
  }

    // Gibt den aktuellen Anzeigemodus als Observable zurück
    getDashboardMode(): Observable<'map' | 'table' > {
      return this.dashboardModeSubject.asObservable();
    }
}
