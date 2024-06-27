import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MonthAverageService } from './services/month-average.service';
import { TemperatureService } from './services/temperature.service';
import { StandardStationData, StandardStationDataService } from './services/standard-station-data.service';
import { CurrentTemperatureService } from './services/current-temperature.service';

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
              private temperatureService: TemperatureService,
              private standardStationData: StandardStationDataService,
              private currentTemperatureService: CurrentTemperatureService
              // private monthAverageService: MonthAverageService,

  ){}
}
