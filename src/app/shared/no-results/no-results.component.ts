import { Component } from '@angular/core';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-no-results',
    templateUrl: './no-results.component.html',
    styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent {
    readonly searchIcon = faSearch;
}
