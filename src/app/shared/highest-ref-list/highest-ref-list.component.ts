import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription, of, tap, catchError } from "rxjs";
import { CurrentTemperatureService } from "../../services/current-temperature.service";
import { DayAverageTemperatureService } from "../../services/day-average.service";
import { StandardStationData } from "../../services/standard-station-data.service";
import { DataDisplayService } from "../../services/data-display.service";
import { MonthAverageService } from "../../services/month-average.service";
import { DateNameService } from "../../services/date-name.service";

@Component({
    selector: "app-highest-ref-list",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./highest-ref-list.component.html",
    styleUrl: "./highest-ref-list.component.scss",
})
export class HighestRefListComponent {
    currentTemperatureData$: Observable<StandardStationData[]>;
    dayAverageTemperatureData$: Observable<StandardStationData[]>;
    monthAverageTemperatureData: StandardStationData[] = [];
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    private subscriptions: Subscription[] = [];
    public selectedMonth: { year: number; month: number } | null = null;
    citys: any[] = [];

    constructor(
        private currentTemperatureService: CurrentTemperatureService,
        private dayAverageTemperatureService: DayAverageTemperatureService,
        private monthAverageService: MonthAverageService,
        private dateNameService: DateNameService,
        private dataDisplayService: DataDisplayService
    ) {
        this.currentTemperatureData$ =
            this.currentTemperatureService.currentTemperature$.pipe(
                catchError(() => of([]))
            );
        this.dayAverageTemperatureData$ =
            this.dayAverageTemperatureService.dayAverageTemperature$.pipe(
                catchError(() => of([]))
            );
    }

    ngOnInit(): void {
        // Abonniere den Anzeigemodus
        this.subscriptions.push(
            this.dataDisplayService.getDisplayMode().subscribe((mode) => {
                this.displayMode = mode;
                this.updateCityData();
                if (mode === "monthAverage") {
                    this.updateMonthAverageData();
                }
            })
        );

        // Initialisiere die Monatsdurchschnittsdaten und aktualisiere die Liste, wenn der Modus 'monthAverage' ist
        this.monthAverageService.createMonthAverageJson().then(() => {
            if (this.displayMode === "monthAverage") {
                this.updateMonthAverageData();
            }
        });

        // Abonniere die ausgewählten Monat-Daten
        this.subscriptions.push(
            this.dataDisplayService.getMonthDataSelected().subscribe((date) => {
                this.selectedMonth = date;
                if (date) {
                    this.setMonthData(date.year, date.month);
                }
            })
        );
    }

    // Setzt die Monat-Daten und aktualisiert die Liste
    setMonthData(year: number, month: number): void {
        this.monthAverageService.setMonthData(year, month);
        this.updateMonthAverageData();
    }

    // lädt die Monatsdurchschnittsdaten
    private updateMonthAverageData(): void {
        this.monthAverageTemperatureData =
            this.monthAverageService.getMonthAverageData();
        this.updateCityData();
    }

    private updateCityData(): void {
        if (this.displayMode === "current") {
            this.currentTemperatureData$.subscribe(
                (data) => (this.citys = data)
            );
        } else if (this.displayMode === "dayAverage") {
            this.dayAverageTemperatureData$.subscribe(
                (data) => (this.citys = data)
            );
        } else if (this.displayMode === "monthAverage") {
            this.citys = this.monthAverageTemperatureData;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public getMonthName(month: any): string {
        return this.dateNameService.getMonthName(month);
    }

    // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
    getMonth(): number {
        const date = new Date();
        return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
    }
}
