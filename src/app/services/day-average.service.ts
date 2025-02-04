import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, timer, of } from "rxjs";
import { catchError, mapTo, switchMap, tap } from "rxjs/operators";
import { StandardStationDataService, StandardStationData } from "./standard-station-data.service";
import { ReferenceDataService } from "./reference-data.service";

@Injectable({
    providedIn: "root",
})
export class DayAverageTemperatureService {
    // API URL to fetch the day average temperature data
    private apiUrl = "https://swissclimatewatch.thtech.ch/get_avg_temp_data.php";

    // Local copy of the standard station data
    private standardStationData: StandardStationData[];

    // BehaviorSubject to hold the updated station data for subscription
    private dayAverageTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);

    // Observable to expose the updated station data
    public dayAverageTemperature$ = this.dayAverageTemperatureSubject.asObservable();

    constructor(private http: HttpClient, private standardStationDataService: StandardStationDataService, private referenceDataService: ReferenceDataService) {
        // Initialize standardStationData with a deep copy of the data provided by the StandardStationDataService
        this.standardStationData = this.deepCopy(this.standardStationDataService.getStandardStationData());
        // Start the process to load and update day average temperature data periodically
        this.loadDayAverageTemperatures();
    }

    /**
     * Initiates a timer that triggers the data fetch and update process every 10 minutes.
     * On error, logs the error and continues the stream.
     */
    private loadDayAverageTemperatures(): void {
        timer(0, 600000) // Start immediately, then every 10 minutes (600000ms)
            .pipe(
                switchMap(() => this.fetchAndStoreDayAverageTemperatureData()),
                catchError((error: any) => {
                    console.error("Error fetching day average temperature data", error);
                    // Log additional error details
                    if (error.status !== undefined) {
                        console.error("-----------Status:", error.status);
                        console.error("-----------Status text:", error.statusText);
                        console.error("-----------URL:", error.url);
                    }

                    // Return an observable that emits void so the timer stream continues
                    return of(void 0);
                })
            )
            .subscribe();
    }

    /**
     * Fetches the day average temperature data from the API,
     * updates the station data with the fetched values,
     * then loads the reference temperatures.
     * @returns An observable that completes when the data has been processed.
     */
    private fetchAndStoreDayAverageTemperatureData(): Observable<void> {
        return this.http.get<{ city: string; avg_temp: string }[]>(this.apiUrl).pipe(
            // Update station data with the parsed API data
            tap((parsedData) => {
                this.updateStationData(parsedData);
            }),
            // After updating, load the reference temperature data
            switchMap(() => this.loadReferenceTemperatures()),
            // Map the output to void
            mapTo(void 0)
        );
    }

    /**
     * Updates the current station data with the average temperature fetched from the API.
     * It rounds the temperature value to one decimal place.
     * @param data Array of objects containing city and avg_temp as strings.
     */
    private updateStationData(data: { city: string; avg_temp: string }[]): void {
        this.standardStationData.forEach((station) => {
            // Find the matching data entry for the station by city name
            const found = data.find((item) => item.city === station.city);
            if (found) {
                // Parse and round the temperature value to one decimal place
                station.currentTemp = Math.round(parseFloat(found.avg_temp) * 10) / 10;
            } else {
                console.warn(`Station ${station.city} not found in fetched day average data`);
            }
        });
    }

    /**
     * Loads the reference temperature data (e.g., from Firebase) for the current month.
     * Updates each station's reference temperatures and notifies subscribers with the updated data.
     * @returns An observable that completes when the reference data has been processed.
     */
    private loadReferenceTemperatures(): Observable<void> {
        const currentMonth = this.getMonth();
        return this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).pipe(
            tap((referenceData) => {
                // Update each station with its corresponding reference temperature data
                this.standardStationData.forEach((station) => {
                    const ref = referenceData.find((r) => r.city === station.city);
                    if (ref) {
                        station.refTemp = ref.referenceTemp.average;
                        station.highestRefTemp = ref.referenceTemp.highest;
                        station.highestRefTempDate = ref.referenceTemp.highest_date;
                    } else {
                        console.warn(`Reference data for station ${station.city} not found`);
                    }
                });
                // Emit a deep copy of the updated station data to all subscribers
                this.dayAverageTemperatureSubject.next(this.deepCopy(this.standardStationData));
            }),
            mapTo(void 0)
        );
    }

    /**
     * Returns the current month as a number (1-12).
     * @returns The current month (1 for January, 12 for December).
     */
    private getMonth(): number {
        return new Date().getMonth() + 1;
    }

    /**
     * Creates a deep copy of the provided data using JSON serialization.
     * Note: This method works for simple JSON-compatible objects.
     * @param data The data to be copied.
     * @returns A deep copy of the input data.
     */
    private deepCopy<T>(data: T): T {
        return JSON.parse(JSON.stringify(data));
    }
}
