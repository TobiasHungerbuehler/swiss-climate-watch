import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DataDisplayService {
    private displayModeSubject = new BehaviorSubject<"current" | "dayAverage" | "monthAverage">("current");
    private monthDataSelectedSubject = new BehaviorSubject<{ year: number; month: number } | null>(null);

    // Setzt den Anzeigemodus
    setDisplayMode(mode: "current" | "dayAverage" | "monthAverage"): void {
        this.displayModeSubject.next(mode);
    }

    // Gibt den aktuellen Anzeigemodus als Observable zurück
    getDisplayMode(): Observable<"current" | "dayAverage" | "monthAverage"> {
        return this.displayModeSubject.asObservable();
    }

    // Wählt die Monat-Daten aus
    selectMonthData(year: number, month: number): void {
        this.monthDataSelectedSubject.next({ year, month });
    }

    // Gibt die ausgewählten Monat-Daten als Observable zurück
    getMonthDataSelected(): Observable<{ year: number; month: number } | null> {
        return this.monthDataSelectedSubject.asObservable();
    }
}
