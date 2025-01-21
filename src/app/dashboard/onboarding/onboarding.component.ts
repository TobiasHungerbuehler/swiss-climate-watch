import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-onboarding",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./onboarding.component.html",
    styleUrl: "./onboarding.component.scss",
})
export class OnboardingComponent {
    @Input() displayMode: "current" | "dayAverage" | "monthAverage" = "current";

    constructor() {}

    onboardingText = {
        current: {
            text: "Diese Karte zeigt die aktuellen Temperaturen an verschiedenen Messstationen in der Schweiz, aktualisiert alle 10 Minuten.",
            textB: "Wir sammeln diese Daten kontinuierlich, um sie für weitere Analysen zu verwenden. Durch die Aufzeichnung können wir Durchschnittstemperaturen der letzten 24 Stunden für jede Messstation erstellen.",
            buttontext: "zeige letzte 24h",
        },
        dayAverage: {
            text: "Vergleich Durchschnittstemperaturen der letzten 24 Stunden mit den historischen Durchschnittswerten von 1940 bis 1970.",
            textB: "Dieser Ansatz berücksichtigt die Temperaturschwankungen innerhalb eines Tages und bietet einen genaueren Überblick über aktuelle Abweichungen. Für eine detailliertere Analyse sind jedoch monatliche Durchschnittswerte aussagekräftiger.",
            buttontext: "Weiter",
        },
        monthAverage: {
            text: "Die Monatsdurschnitte im Vergleich zum Referenzzeitraum 1940 bis 1970.",
            textB: "Sie können einen beliebigen Monat auswählen, um die Veränderungen an allen Messstationen zu betrachten. Die Daten zeigen deutlich, wie sich das Klima in den letzten Jahrzehnten entwickelt hat.\nMeteoSchweiz stellt die monatlichen Durchschnittswerte zur Verfügung, wodurch wir genauere Zahlen erhalten und unseren Vergleich zu früher präzise abbilden können.",
            buttontext: "Weiter",
        },
    };
}
