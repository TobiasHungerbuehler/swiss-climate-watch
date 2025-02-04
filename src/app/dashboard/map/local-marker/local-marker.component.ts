import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StandardStationData } from "../../../services/standard-station-data.service";

@Component({
    selector: "app-local-marker",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./local-marker.component.html",
    styleUrls: ["./local-marker.component.scss"],
})
export class LocalMarkerComponent implements OnInit, OnChanges {
    @ViewChild("tooltip") tooltip!: ElementRef;
    @ViewChild("mapContainer", { static: true }) mapContainer!: ElementRef;

    @Input() mapDisplayData: StandardStationData[] = [];

    tooltipContent = "";
    @Input() showAnomalie: boolean = true;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["mapDisplayData"]) {
            //console.log('New mapDisplayData::::::::::::::::::::', this.mapDisplayData);
        }
    }

    onMarkerMouseEnter(event: MouseEvent, cityName: string, currentTemp: number): void {
        this.tooltipContent = `${cityName}  |  ${currentTemp}°`;
        const tooltip = this.tooltip.nativeElement as HTMLElement;
        tooltip.style.display = "block";
        this.moveTooltip(event); // Move tooltip to follow the mouse
    }

    onMarkerMouseLeave(): void {
        const tooltip = this.tooltip.nativeElement as HTMLElement;
        tooltip.style.display = "none";
    }

    onMarkerMouseMove(event: MouseEvent): void {
        this.moveTooltip(event);
    }

    moveTooltip(event: MouseEvent): void {
        const tooltip = this.tooltip.nativeElement as HTMLElement;
        const mapContainer = this.mapContainer.nativeElement as HTMLElement;
        const containerRect = mapContainer.getBoundingClientRect();
        tooltip.style.top = `${event.clientY - containerRect.top + 10}px`;
        tooltip.style.left = `${event.clientX - containerRect.left + 10}px`;
    }
}
