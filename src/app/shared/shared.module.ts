import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PaginatorComponent } from './paginator/paginator.component';
import { PaginatorButtonComponent } from './paginator-button/paginator-button.component';
import { ModalComponent } from './modal/modal.component';
import { NoResultsComponent } from './no-results/no-results.component';



@NgModule({
    declarations: [
        SearchInputComponent,
        UserCardComponent,
        PaginatorComponent,
        PaginatorButtonComponent,
        ModalComponent,
        NoResultsComponent
    ],
    exports: [
        SearchInputComponent,
        UserCardComponent,
        PaginatorComponent,
        PaginatorButtonComponent,
        NoResultsComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FontAwesomeModule
    ]
})
export class SharedModule { }
