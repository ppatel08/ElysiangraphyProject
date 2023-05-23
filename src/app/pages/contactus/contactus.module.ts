import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { contactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactusSaveComponent } from './contactus-save/contactus-save.component';
import { ContactUsViewComponent } from './contact-us-view/contact-us-view.component';


@NgModule({
    declarations: [
        ContactusComponent,
        ContactusSaveComponent,
        ContactUsViewComponent,
    ],
    imports: [
        CommonModule,
        contactusRoutingModule,
        SharedModule
    ]
})
export class ContactusModule { }
