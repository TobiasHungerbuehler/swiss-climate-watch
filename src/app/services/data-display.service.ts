import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displayModeSubject = new BehaviorSubject<'current' | 'dayAverage'>('current');
  private monthDataSelectedSubject = new BehaviorSubject<{ year: number, month: number } | null>(null);

  setDisplayMode(mode: 'current' | 'dayAverage'): void {
    this.displayModeSubject.next(mode);
  }

  getDisplayMode(): Observable<'current' | 'dayAverage'> {
    return this.displayModeSubject.asObservable();
  }

  getDisplayModeValue(): 'current' | 'dayAverage' {
    return this.displayModeSubject.getValue();
  }

  selectMonthData(year: number, month: number): void {
    this.monthDataSelectedSubject.next({ year, month });
  }

  getMonthDataSelected(): Observable<{ year: number, month: number } | null> {
    return this.monthDataSelectedSubject.asObservable();
  }
}

//jadnfloadfjogadjfiogjadofgjoidfjb
///jadhfghadfghaodfüg
