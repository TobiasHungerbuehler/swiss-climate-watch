import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-map-temp-scale",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./map-temp-scale.component.html",
    styleUrl: "./map-temp-scale.component.scss",
})
export class MapTempScaleComponent {
    @Input() displayMode: "current" | "dayAverage" | "monthAverage" = "current";
    @Input() dashboardMode: "map" | "table" = "map"; //kjdahfgkjuh jdajoij
}
