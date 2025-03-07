import { Component, OnInit } from "@angular/core";
import { DataDisplayService } from "../services/data-display.service";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { DashboardToggleServiceService } from "../services/dashboard-toggle-service.service";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: "app-main-content",
    standalone: true,
    imports: [CommonModule, DashboardComponent],
    templateUrl: "./main-content.component.html",
    styleUrls: ["./main-content.component.scss"],
})
export class MainContentComponent implements OnInit {
    public displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    public dashboardMode: "map" | "table" = "map";
    private subscriptions: Subscription[] = [];

    constructor(private dataDisplayService: DataDisplayService, private dashboardToggleService: DashboardToggleServiceService) {}

    ngOnInit(): void {
        // Abonniere den Anzeigemodus
        this.subscriptions.push(
            this.dataDisplayService.getDisplayMode().subscribe((mode) => {
                this.displayMode = mode;
            })
        );

        // Abonniere den Dashboardmodus
        this.subscriptions.push(
            this.dashboardToggleService.getDashboardMode().subscribe((mode) => {
                this.dashboardMode = mode;
            })
        );
    }
}
