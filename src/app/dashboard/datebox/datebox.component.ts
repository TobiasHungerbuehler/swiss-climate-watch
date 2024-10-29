import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { DateNameService } from "../../services/date-name.service";
import { DataDisplayService } from "../../services/data-display.service";
import { StandardStationData } from "../../services/standard-station-data.service";
import { MonthAverageService } from "../../services/month-average.service";
import { DateTimeService } from "../../services/date-time.service";

@Component({
    selector: "app-datebox",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./datebox.component.html",
    styleUrl: "./datebox.component.scss",
})
export class DateboxComponent {
    monthAverageTemperatureData: StandardStationData[] = [];
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";

    private subscriptions: Subscription[] = [];
    public selectedMonth: { year: number; month: number } | null = null;

    currentTime: string = "";
    currentDate: string = "";
    previousDate: string = "";
    actualMonth: number = 0;
    citys: any[] = [];

    constructor(
        private dateNameService: DateNameService,
        private dataDisplayService: DataDisplayService,
        private monthAverageService: MonthAverageService,
        private dateTimeService: DateTimeService
    ) {}

    ngOnInit(): void {
        // Abonniere den Anzeigemodus
        this.subscriptions.push(
            this.dataDisplayService.getDisplayMode().subscribe((mode) => {
                this.displayMode = mode;
            })
        );

        // Abonniere die ausgewählten Monat-Daten
        this.subscriptions.push(
            this.dataDisplayService.getMonthDataSelected().subscribe((date) => {
                this.selectedMonth = date;
                if (date) {
                    //console.log('abnoniere monatsdaten',date);

                    this.setMonthData(date.year, date.month);
                }
            })
        );

        this.subscriptions.push(
            this.dateTimeService.getCurrentTime().subscribe((time) => (this.currentTime = time)),
            this.dateTimeService.getCurrentDate().subscribe((date) => (this.currentDate = date)),
            this.dateTimeService.getPreviousDate().subscribe((prevDate) => (this.previousDate = prevDate))
        );
    }

    // Setzt die Monat-Daten und aktualisiert die Kartendarstellung
    setMonthData(year: number, month: number): void {
        this.monthAverageService.setMonthData(year, month);
        this.updateMonthAverageData();
    }

    public getMonthName(month: any): string {
        return this.dateNameService.getMonthName(month);
    }

    // Aufräumen der Abonnements beim Zerstören der Komponente
    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    // Aktualisiert die Monatsdurchschnittsdaten
    private updateMonthAverageData(): void {
        this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
    }

    // Funktion zum Abrufen des aktuellen Monats als Zahl (1-12)
    getMonth(): number {
        const date = new Date();
        return date.getMonth() + 1; // JavaScript gibt Monate von 0-11 zurück, daher +1
    }
}
