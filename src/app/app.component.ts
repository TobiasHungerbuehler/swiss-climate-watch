import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { CurrentTemperatureService } from './services/current-temperature.service';
import { DayAverageTemperatureService } from './services/day-average.service';
import { MonthAverageService } from './services/month-average.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swiss-climate-watch';

  constructor(
              private monthAverageService: MonthAverageService,
              //private dayAverageTemperatureService: DayAverageTemperatureService,
              private currentTemperatureService: CurrentTemperatureService
              // private monthAverageService: MonthAverageService,

  ){}
}
