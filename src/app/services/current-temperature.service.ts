import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer, BehaviorSubject, of } from "rxjs";
import { catchError, map, mapTo, switchMap, tap } from "rxjs/operators";
import { StandardStationDataService, StandardStationData } from "./standard-station-data.service";
import { ReferenceDataService } from "./reference-data.service";

@Injectable({
    providedIn: "root",
})
export class CurrentTemperatureService {
    // URL of the CSV file that contains current temperature data
    private csvUrl = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv";

    // BehaviorSubject to hold and emit current temperature data for stations
    private currentTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
    public currentTemperature$ = this.currentTemperatureSubject.asObservable();

    // Local array that stores the current temperature data for each station
    private currentTempData: StandardStationData[] = [];

    constructor(private http: HttpClient, private standardStationDataService: StandardStationDataService, private referenceDataService: ReferenceDataService) {
        // Initialize currentTempData as a shallow copy of the standard station data
        this.currentTempData = this.standardStationDataService.getStandardStationData().map((data) => ({ ...data }));
        // Start loading and updating current temperature data periodically
        this.loadCurrentTemperatures();
    }

    /**
     * Initiates a timer that triggers the fetching and updating of current temperature data.
     * The process starts after an initial delay of 500ms and then runs every 60 seconds.
     */
    private loadCurrentTemperatures(): void {
        timer(500, 60000) // Initial delay 500ms, then every 60000ms (1 minute)
            .pipe(
                switchMap(() => this.fetchAndStoreTemperatureData()),
                catchError((error) => {
                    console.error("Error fetching temperature data", error);
                    // Return an observable that emits void so the stream continues
                    return of(void 0);
                })
            )
            .subscribe();
    }

    /**
     * Fetches the CSV data from the specified URL, parses it,
     * updates the station data with the new temperature values,
     * and then loads reference temperature data.
     * @returns An observable that completes when all operations are done.
     */
    private fetchAndStoreTemperatureData(): Observable<void> {
        return this.http.get(this.csvUrl, { responseType: "text" }).pipe(
            map((response) => this.parseCSV(response)),
            tap((parsedData) => this.updateStationData(parsedData)),
            switchMap(() => this.loadReferenceTemperatures()),
            mapTo(void 0)
        );
    }

    /**
     * Parses CSV string data into an array of objects containing city and temperature.
     * It skips the header row and splits each remaining row by semicolons.
     * @param data - The raw CSV string data.
     * @returns An array of parsed objects with properties "Stadt" and "Temperatur".
     */
    private parseCSV(data: string): { Stadt: string; Temperatur: string }[] {
        const rows = data.split("\n").slice(1);
        return rows
            .map((row) => {
                const columns = row.split(";");
                return {
                    Stadt: columns[1]?.replace(/"/g, ""),
                    Temperatur: columns[3]?.replace(/"/g, ""),
                };
            })
            .filter((row) => row.Stadt && row.Temperatur);
    }

    /**
     * Updates the local station data with the parsed temperature values.
     * For each entry, it finds the matching station by city name and updates its current temperature,
     * rounding the temperature value to one decimal place.
     * After updating, it notifies subscribers with the updated data.
     * @param data - An array of objects containing "Stadt" and "Temperatur" properties.
     */
    private updateStationData(data: { Stadt: string; Temperatur: string }[]): void {
        data.forEach((item) => {
            const station = this.currentTempData.find((station) => station.city === item.Stadt);
            if (station) {
                station.currentTemp = parseFloat(parseFloat(item.Temperatur).toFixed(1));
            }
        });
        this.currentTemperatureSubject.next(this.currentTempData);
    }

    /**
     * Loads reference temperature data for the current month from an external source (e.g., Firebase).
     * It updates each station with reference temperature values and additional details.
     * Once updated, the new data is emitted to subscribers.
     * @returns An observable that completes when the reference data has been processed.
     */
    private loadReferenceTemperatures(): Observable<void> {
        const currentMonth = this.getMonth();
        return this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).pipe(
            tap((referenceData) => {
                this.currentTempData.forEach((station) => {
                    const ref = referenceData.find((r) => r.city === station.city);
                    if (ref) {
                        station.refTemp = ref.referenceTemp.average;
                        station.month = ref.refAverageMonth;
                        station.highestRefTemp = ref.referenceTemp.highest;
                        station.highestRefTempDate = ref.referenceTemp.highest_date;
                    }
                });
                this.currentTemperatureSubject.next(this.currentTempData);
            }),
            mapTo(void 0)
        );
    }

    /**
     * Retrieves the current month as a number (1 for January through 12 for December).
     * @returns The current month (1-12).
     */
    private getMonth(): number {
        const date = new Date();
        return date.getMonth() + 1;
    }
}
