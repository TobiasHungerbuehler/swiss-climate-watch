import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ReferenceDataService } from "./reference-data.service";
import { StandardStationData, StandardStationDataService } from "./standard-station-data.service";

@Injectable({
    providedIn: "root",
})
export class MonthAverageService {
    // Local copy of standard station data
    private monthAverageData: StandardStationData[] = this.deepCopy(this.standardStationDataService.getStandardStationData());
    // Temporary array to store downloaded monthly average data
    private tempMonthAverages: any[] = [];
    // List of available dates (year and month) based on the downloaded data
    private availableDateList: { year: number; month: number }[] = [];

    // Subject for the available date list
    private availableDateListSubject = new BehaviorSubject<{ year: number; month: number }[]>([]);
    public availableDateList$ = this.availableDateListSubject.asObservable();

    // Subject for the monthly average temperature data
    private monthAverageTemperatureSubject = new BehaviorSubject<StandardStationData[]>([]);
    public monthAverageTemperature$ = this.monthAverageTemperatureSubject.asObservable();

    constructor(private standardStationDataService: StandardStationDataService, private referenceDataService: ReferenceDataService) {
        // Start the process of loading month data and creating the available date list
        this.createMonthAverageJson();
    }

    /**
     * Creates a deep copy of the provided data.
     * @param data - The data to be copied.
     * @returns A deep copy of the input data.
     */
    private deepCopy(data: any): any {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * Initiates the process to load monthly data and then create the available date list.
     * @returns A promise that resolves when the process is complete.
     */
    createMonthAverageJson(): Promise<void> {
        return this.loadMonthData().then(() => {
            this.createAvailableDateList();
        });
    }

    /**
     * Loads monthly average data for each station from an external URL.
     * Data is fetched concurrently for all stations.
     * @returns A promise that resolves when all data has been loaded.
     */
    private async loadMonthData(): Promise<void> {
        const promises = this.monthAverageData.map(async (station) => {
            const url = `https://data.geo.admin.ch/ch.meteoschweiz.klima/nbcn-homogen/homog_mo_${station.city}.txt`;
            try {
                const response = await fetch(url);
                const text = await response.text();
                const jsonData = this.parseData(text);

                // Append the parsed data (with the associated city) to the temporary array
                if (jsonData.length) {
                    this.tempMonthAverages.push(...jsonData.map((item) => ({ city: station.city, ...item })));
                }
            } catch (error) {
                console.error(`Error fetching data for city ${station.city}:`, error);
            }
        });

        await Promise.all(promises);
    }

    /**
     * Parses the raw text data into an array of data objects.
     * The data is expected to have four parts per line:
     * year, month, temperature, and precipitation.
     * Only records with a year >= 2018 are included.
     * @param data - The raw data string to parse.
     * @returns An array of parsed data objects.
     */
    private parseData(data: string): any[] {
        const lines = data.split("\n");
        const parsedData = [];

        for (const line of lines) {
            const parts = line.trim().split(/\s+/);

            if (parts.length === 4) {
                const year = parseInt(parts[0]);
                const month = parseInt(parts[1]);
                const temperature = parts[2] !== "NA" ? parseFloat(parts[2]) : null;
                const precipitation = parts[3] !== "NA" ? parseFloat(parts[3]) : null;

                if (year >= 2018) {
                    parsedData.push({ year, month, temperature, precipitation });
                }
            }
        }
        return parsedData;
    }

    /**
     * Creates a list of available dates (year and month) based on the downloaded monthly data.
     * The list is sorted in descending order (latest date first) and emitted via an observable.
     * Finally, the monthly temperature data is mapped to the station data.
     */
    createAvailableDateList(): void {
        const dates = new Set<string>();

        // Use data from the first city as a basis for available dates
        const firstCityData = this.tempMonthAverages.filter((item) => item.city === this.tempMonthAverages[0].city);

        firstCityData.forEach((record) => {
            const dateKey = `${record.year}-${record.month}`;
            if (!dates.has(dateKey) && record.year >= 2018) {
                dates.add(dateKey);
                this.availableDateList.push({ year: record.year, month: record.month });
            }
        });

        // Sort available dates in descending order (latest first)
        this.availableDateList.sort((a, b) => {
            if (a.year === b.year) {
                return b.month - a.month;
            }
            return b.year - a.year;
        });

        this.availableDateListSubject.next(this.availableDateList);
        this.monthTempToStaionData();
    }

    /**
     * Maps the temporary monthly data to the station data for a given year and month.
     * If no year or month is provided, the latest available date is used.
     * After mapping, the reference temperature data is updated.
     * @param year - Optional year parameter.
     * @param month - Optional month parameter.
     */
    private monthTempToStaionData(year?: number, month?: number): void {
        if (!year || !month) {
            const latestDate = this.availableDateList[0];
            year = latestDate.year;
            month = latestDate.month;
        }

        this.monthAverageData.forEach((station) => {
            const record = this.tempMonthAverages.find((item) => item.city === station.city && item.year === year && item.month === month);
            if (record) {
                station.currentTemp = record.temperature !== null ? record.temperature : 0;
                // Store the selected year and month in the station data
                station.year = year;
                station.month = month;
            }
        });

        this.refTempToStationData(month);
    }

    /**
     * Updates the station data with reference temperature data for the specified month.
     * Subscribes to the reference data service and, once the data is received, maps it to the station data.
     * After updating, the modified station data is emitted via an observable.
     * @param currentMonth - The month for which to fetch reference temperature data.
     */
    private refTempToStationData(currentMonth: number): void {
        this.referenceDataService.subscribeToReferenceDataForMonth(currentMonth).subscribe((referenceData) => {
            this.monthAverageData.forEach((station) => {
                const ref = referenceData.find((r) => r.city === station.city);
                if (ref) {
                    station.refTemp = ref.referenceTemp.average;
                    station.highestRefTemp = ref.referenceTemp.highest;
                    station.highestRefTempDate = ref.referenceTemp.highest_date;
                }
            });
            this.monthAverageTemperatureSubject.next(this.deepCopy(this.monthAverageData));
        });
    }

    /**
     * Sets the current month data based on the provided year and month.
     * @param year - The year for the desired data.
     * @param month - The month for the desired data.
     */
    setMonthData(year: number, month: number): void {
        this.monthTempToStaionData(year, month);
    }

    /**
     * Returns a deep copy of the current month average station data.
     * @returns The current month average data.
     */
    getMonthAverageData(): StandardStationData[] {
        return this.deepCopy(this.monthAverageData);
    }
}
