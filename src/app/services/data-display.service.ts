import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displayModeSubject = new BehaviorSubject<'current' | 'dayAverage' | 'monthAverage'>('current');

  setDisplayMode(mode: 'current' | 'dayAverage' | 'monthAverage'): void {
    this.displayModeSubject.next(mode);
  }

  getDisplayMode(): Observable<'current' | 'dayAverage' | 'monthAverage'> {
    return this.displayModeSubject.asObservable();
  }

  getDisplayModeValue(): 'current' | 'dayAverage' | 'monthAverage' {
    return this.displayModeSubject.getValue();
  }
}
