import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { DataToggleComponent } from '../data-toggle/data-toggle.component';
import { TemperatureService } from '../services/temperature.service';
import { FirebaseDataService } from '../services/firebase-data.service';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MapComponent, DataToggleComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(private firebaseDataService: FirebaseDataService) { // Füge den TemperatureService zum Konstruktor hinzu
  }

  ngOnInit(): void {

    const month = 1; // Beispiel für Januar
    this.firebaseDataService.subscribeToReferenceDataForMonth(month);

  }
}
