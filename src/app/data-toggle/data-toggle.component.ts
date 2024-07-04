import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { DataDisplayService } from '../services/data-display.service';
import { MonthAverageService } from '../services/month-average.service';
import { Subscription } from 'rxjs';
import {MatSliderModule} from '@angular/material/slider';





@Component({
  selector: 'app-data-toggle',
  standalone: true,
  imports: [CommonModule, MatSliderModule],
  templateUrl: './data-toggle.component.html',
  styleUrls: ['./data-toggle.component.scss']
})
export class DataToggleComponent implements OnInit, OnDestroy {
  availableDateList: { year: number, month: number }[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private dataDisplayService: DataDisplayService,
    private monthAverageService: MonthAverageService
  ) {}

  sliderValue: number = 2024;
  bulletPosition: number = 100; // Initial position for max value

  ngOnInit(): void {
    // Abonniere die verfügbaren Daten aus dem MonthAverageService
    this.subscriptions.push(
      this.monthAverageService.availableDateList$.subscribe(dates => {
        this.availableDateList = dates;
        console.log('Available Date List:', this.availableDateList);
      })
    );
  }

  // Setzt den Modus auf 'current' oder 'dayAverage'
  setMode(mode: 'current' | 'dayAverage'): void {
    this.dataDisplayService.setDisplayMode(mode);
  }

  // Setzt den Modus auf 'monthAverage' und gibt die Daten für den ersten verfügbaren Monat aus
  setInitMonthData(): void {
    if (this.availableDateList.length > 0) {
      const { year, month } = this.availableDateList[0];
      this.dataDisplayService.setDisplayMode('monthAverage');  // Setzt den Modus auf 'monthAverage'
      this.dataDisplayService.selectMonthData(year, month);
      console.log(`Emitted month data: ${year}-${month}`);
    } else {
      console.warn('No available dates to set');
    }
  }

  //gibt die Daten nach ausgewähltem Datum aus
  setSelectedMonthData(year: number, month: number): void{
    this.dataDisplayService.setDisplayMode('monthAverage');  // Setzt den Modus auf 'monthAverage'
    this.dataDisplayService.selectMonthData(year, month);
  }

  onYearChange(event: any): void {
    const selectedYear = event.value;
    console.log(`Selected Year: ${selectedYear}`);
  }

  ngOnDestroy(): void {
    // Aufräumen der Abonnements
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  



}
