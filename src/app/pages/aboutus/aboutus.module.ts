import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AboutusRoutingModule } from "./aboutus-routing.module";
import { AboutusSaveComponent } from "./aboutus-save/aboutus-save.component";
import { AboutusComponent } from "./aboutus/aboutus.component";


@NgModule({
    declarations: [
        AboutusComponent,
        AboutusSaveComponent,
    ],
    imports: [
        CommonModule,
        AboutusRoutingModule,
        SharedModule
    ]
})
export class AboutusModule { }