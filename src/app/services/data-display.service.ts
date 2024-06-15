import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displayModeSubject = new BehaviorSubject<'current' | 'historical'>('current');
  displayMode$ = this.displayModeSubject.asObservable();

  setDisplayMode(mode: 'current' | 'historical') {
    this.displayModeSubject.next(mode);
  }

  getDisplayMode() {
    return this.displayModeSubject.value;
  }
}
