import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displayModeSubject = new BehaviorSubject<'current' | 'historical'>('current');

  setDisplayMode(mode: 'current' | 'historical'): void {
    this.displayModeSubject.next(mode);
  }

  getDisplayMode(): Observable<'current' | 'historical'> {
    return this.displayModeSubject.asObservable();
  }
}
