import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displayModeSubject = new BehaviorSubject<'current' | 'dayAverage' | 'historical'>('current');

  setDisplayMode(mode: 'current' | 'dayAverage' | 'historical'): void {
    this.displayModeSubject.next(mode);
  }

  getDisplayMode(): Observable<'current' | 'dayAverage' | 'historical'> {
    return this.displayModeSubject.asObservable();
  }
}
