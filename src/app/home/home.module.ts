import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ViewComponent } from './view/view.component';


@NgModule({
    declarations: [
        SearchComponent,
        ViewComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        SharedModule,
        FontAwesomeModule,
        NgOptimizedImage
    ]
})
export class HomeModule { }
