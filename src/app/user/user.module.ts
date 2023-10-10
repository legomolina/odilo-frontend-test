import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UserRoutingModule } from "./user-routing.module";
import { ListComponent } from './list/list.component';
import { ViewComponent } from "./view/view.component";


@NgModule({
    declarations: [
        ListComponent,
        ViewComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        SharedModule,
        FontAwesomeModule,
        NgOptimizedImage
    ]
})
export class UserModule { }
