import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataDisplayService } from "../../services/data-display.service";
import { MonthAverageService } from "../../services/month-average.service";
import { Subscription } from "rxjs";
import { DateTimeService } from "../../services/date-time.service";
import { DateNameService } from "../../services/date-name.service";

@Component({
    selector: "app-data-toggle",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./data-toggle.component.html",
    styleUrls: ["./data-toggle.component.scss"],
})
export class DataToggleComponent implements OnInit, OnDestroy {
    availableDateList: { year: number; month: number }[] = [];
    availableYears: number[] = [];
    availableMonths: number[] = [];
    selectedYear: number | null = null;
    selectedMonth: number | null = null;
    private subscriptions: Subscription[] = [];
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    overlayLarge: boolean = false;

    constructor(
        private dataDisplayService: DataDisplayService,
        private monthAverageService: MonthAverageService,
        private dateTimeService: DateTimeService,
        private dateNameService: DateNameService
    ) {}

    ngOnInit(): void {
        // Abonniere die verfügbaren Daten aus dem MonthAverageService
        this.subscriptions.push(
            this.monthAverageService.availableDateList$.subscribe((dates) => {
                this.availableDateList = dates;
                this.updateAvailableYears();
                this.setInitialSelections();
            })
        );

        // Abonniere den Anzeigemodus
        this.subscriptions.push(
            this.dataDisplayService.getDisplayMode().subscribe((mode) => {
                this.displayMode = mode;
            })
        );

        // Set initial display mode to 'current'
        this.dataDisplayService.setDisplayMode("current");
    }

    // Aktualisiere die Liste der verfügbaren Jahre
    updateAvailableYears(): void {
        const years = new Set(this.availableDateList.map((date) => date.year));
        this.availableYears = Array.from(years).sort((a, b) => b - a); // Sortiere in absteigender Reihenfolge
    }

    // Aktualisiere die Liste der verfügbaren Monate basierend auf dem ausgewählten Jahr
    updateAvailableMonths(year: number): void {
        this.availableMonths = this.availableDateList
            .filter((date) => date.year === year)
            .map((date) => date.month)
            .filter((month, index, self) => self.indexOf(month) === index) // Entferne doppelte Monate
            .sort((a, b) => a - b); // Sortiere in aufsteigender Reihenfolge
    }

    // Setze die initiale Auswahl für Jahr und Monat
    setInitialSelections(): void {
        if (this.availableDateList.length > 0) {
            const latestDate = this.availableDateList[0];
            this.selectedYear = latestDate.year;
            this.updateAvailableMonths(this.selectedYear);
            this.selectedMonth = latestDate.month;
            // Initial month data selection without changing display mode
            this.dataDisplayService.selectMonthData(this.selectedYear, this.selectedMonth);
        }
    }

    // Setzt den Modus auf 'current' oder 'dayAverage'
    setMode(mode: "current" | "dayAverage"): void {
        this.dataDisplayService.setDisplayMode(mode);
    }

    // Setzt den Modus auf 'monthAverage' und gibt die Daten für den ersten verfügbaren Monat aus
    setInitMonthData(): void {
        if (this.availableDateList.length > 0) {
            const { year, month } = this.availableDateList[0];
            this.dataDisplayService.setDisplayMode("monthAverage"); // Setzt den Modus auf 'monthAverage'
            this.dataDisplayService.selectMonthData(year, month);
            console.log(`Emitted month data: ${year}-${month}`);
        } else {
            console.warn("No available dates to set");
        }
    }

    //gibt die Daten nach ausgewähltem Datum aus
    setSelectedMonthData(year: number, month: number): void {
        this.dataDisplayService.setDisplayMode("monthAverage"); // Setzt den Modus auf 'monthAverage'
        this.dataDisplayService.selectMonthData(year, month);
    }

    // Event-Handler für die Auswahl des Jahres
    onYearChange(event: any): void {
        const selectedYear = parseInt(event.target.value, 10);
        this.selectedYear = selectedYear;
        this.updateAvailableMonths(selectedYear);
        this.selectedMonth = null; // Clear the month selection
        this.largeOverlay(false);
    }

    // Event-Handler für die Auswahl des Monats
    onMonthChange(event: any): void {
        const selectedMonth = parseInt(event.target.value, 10);
        if (this.selectedYear !== null) {
            this.selectedMonth = selectedMonth;
            this.setSelectedMonthData(this.selectedYear, selectedMonth);
        }
        this.largeOverlay(false);
    }

    // Funktion zur Rückgabe des Monatsnamens
    getMonthName(month: number): string {
        return this.dateNameService.getMonthName(month);
    }

    ngOnDestroy(): void {
        // Aufräumen der Abonnements
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    largeOverlay(isFocused: boolean) {
        this.overlayLarge = isFocused;
        console.log("Overlay status:", this.overlayLarge);
    }
}
