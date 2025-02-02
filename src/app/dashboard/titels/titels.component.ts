import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { StandardStationData } from "../../services/standard-station-data.service";
import { Subscription } from "rxjs";
import { CurrentTemperatureService } from "../../services/current-temperature.service";
import { DayAverageTemperatureService } from "../../services/day-average.service";
import { MonthAverageService } from "../../services/month-average.service";
import { DateNameService } from "../../services/date-name.service";
import { DataDisplayService } from "../../services/data-display.service";

@Component({
    selector: "app-titels",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./titels.component.html",
    styleUrl: "./titels.component.scss",
})
export class TitelsComponent {
    //currentTemperature$: Observable<StandardStationData[]>;
    //dayAverageTemperatureData$: Observable<StandardStationData[]>;
    monthAverageTemperatureData: StandardStationData[] = [];
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    //public dashboardMode: "map" | "table" = "map";
    private subscriptions: Subscription[] = [];
    public selectedMonth: { year: number; month: number } | null = null;

    currentTime: string = "";
    currentDate: string = "";
    previousDate: string = "";

    currentDisplayData: StandardStationData[] = [];
    dayAverageDisplayData: StandardStationData[] = [];

    //showAnomalie = false;

    constructor(private dataDisplayService: DataDisplayService, private currentTemperatureService: CurrentTemperatureService, private dayAverageTemperatureService: DayAverageTemperatureService, private monthAverageService: MonthAverageService, private dateNameService: DateNameService) {}

    ngOnInit(): void {
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

    getMonth(): number {
        const date = new Date();
        return date.getMonth() + 1;
    }
}
