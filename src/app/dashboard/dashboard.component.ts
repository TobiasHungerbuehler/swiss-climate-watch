import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MapComponent } from "./map/map.component";
import { CurrentTemperatureService } from "../services/current-temperature.service";
import { DayAverageTemperatureService } from "../services/day-average.service";
import { StandardStationData } from "../services/standard-station-data.service";
import { DataDisplayService } from "../services/data-display.service";
import { Observable, Subscription, of } from "rxjs";
import { MonthAverageService } from "../services/month-average.service";
import { TableComponent } from "./table/table.component";
import { DateNameService } from "../services/date-name.service";
import { DateTimeService } from "../services/date-time.service";
import { HighestRefListComponent } from "../shared/highest-ref-list/highest-ref-list.component";
import { DashboardToggleServiceService } from "../services/dashboard-toggle-service.service";
import { OnboardingComponent } from "./onboarding/onboarding.component";
import { DateboxComponent } from "./datebox/datebox.component";
import { DashboardToggleComponent } from "./dashboard-toggle/dashboard-toggle.component";
import { DataToggleComponent } from "./data-toggle/data-toggle.component";
import { MapTempScaleComponent } from "./map-temp-scale/map-temp-scale.component";
import { TitelsComponent } from "./titels/titels.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [CommonModule, MapComponent, TableComponent, HighestRefListComponent, OnboardingComponent, DateboxComponent, DashboardToggleComponent, DataToggleComponent, MapTempScaleComponent, TitelsComponent],
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
    monthAverageTemperatureData: StandardStationData[] = [];
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    public dashboardMode: "map" | "table" = "map";
    private subscriptions: Subscription[] = [];
    public selectedMonth: { year: number; month: number } | null = null;

    currentTime: string = "";
    currentDate: string = "";
    previousDate: string = "";

    currentDisplayData: StandardStationData[] = [];
    dayAverageDisplayData: StandardStationData[] = [];

    constructor(private currentTemperatureService: CurrentTemperatureService, private dayAverageTemperatureService: DayAverageTemperatureService, private monthAverageService: MonthAverageService, private dataDisplayService: DataDisplayService, private dateNameService: DateNameService, private dateTimeService: DateTimeService, private dashboardToggleService: DashboardToggleServiceService) {}

    ngOnInit(): void {
        // Abonniere currrent data
        this.subscriptions.push(
            this.currentTemperatureService.currentTemperature$.subscribe((data) => {
                this.currentDisplayData = [...data];
            })
        );

        // Abonniere dayAverage data
        this.subscriptions.push(
            this.dayAverageTemperatureService.dayAverageTemperature$.subscribe((data) => {
                this.dayAverageDisplayData = [...data];
            })
        );

        //Aboniere Display mode
        this.subscriptions.push(
            this.dataDisplayService.getDisplayMode().subscribe((mode) => {
                this.displayMode = mode;
            })
        );

        //Aboniere den gewählten monat
        this.subscriptions.push(
            this.dataDisplayService.getMonthDataSelected().subscribe((date) => {
                this.selectedMonth = date;
                if (date) {
                    this.setMonthData(date.year, date.month);
                }
            })
        );

        // Abonniere den Dashboardmodus
        this.subscriptions.push(
            this.dashboardToggleService.getDashboardMode().subscribe((mode) => {
                this.dashboardMode = mode;
            })
        );

        this.subscriptions.push(
            this.dateTimeService.getCurrentTime().subscribe((time) => (this.currentTime = time)),
            this.dateTimeService.getCurrentDate().subscribe((date) => (this.currentDate = date)),
            this.dateTimeService.getPreviousDate().subscribe((prevDate) => (this.previousDate = prevDate))
        );
    }

    setMonthData(year: number, month: number): void {
        this.monthAverageService.setMonthData(year, month);
        this.updateMonthAverageData();
    }

    private updateMonthAverageData(): void {
        this.monthAverageTemperatureData = this.monthAverageService.getMonthAverageData();
    }

    public getMonthName(month: any): string {
        return this.dateNameService.getMonthName(month);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    getMonth(): number {
        const date = new Date();
        return date.getMonth() + 1;
    }
}
