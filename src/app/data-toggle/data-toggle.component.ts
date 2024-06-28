import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataDisplayService } from '../services/data-display.service';
import { MonthAverageService } from '../services/month-average.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-toggle',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit(): void {
    this.subscriptions.push(
      this.monthAverageService.availableDateList$.subscribe(dates => {
        this.availableDateList = dates;
        console.log('Available Date List:', this.availableDateList);
      })
    );
  }

  setMode(mode: 'current' | 'dayAverage' | 'monthAverage') {
    this.dataDisplayService.setDisplayMode(mode);
  }

  setMonthData(): void {
    if (this.availableDateList.length > 0) {
      const { year, month } = this.availableDateList[0];
      this.dataDisplayService.selectMonthData(year, month);
      console.log(`Emitted month data: ${year}-${month}`);
    } else {
      console.warn('No available dates to set');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
