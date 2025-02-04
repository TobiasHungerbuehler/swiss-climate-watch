import { Routes } from "@angular/router";
import { MainContentComponent } from "./main-content/main-content.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ImpressumComponent } from "./impressum/impressum.component";

export const routes: Routes = [
    { path: "", component: MainContentComponent },
    { path: "privacy", component: PrivacyComponent },
    { path: "impressum", component: ImpressumComponent },
];
