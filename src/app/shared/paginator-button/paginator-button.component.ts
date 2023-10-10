import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-paginator-button',
    templateUrl: './paginator-button.component.html',
    styleUrls: ['./paginator-button.component.scss']
})
export class PaginatorButtonComponent {
    @Input() selected = false;
}
